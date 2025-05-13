<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-white">Anbieter Dashboard</h1>
        <NuxtLink
          to="/provider/services/new"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Neuen Dienst erstellen
        </NuxtLink>
      </div>

      <!-- Meine Dienste -->
      <div class="mb-8">
        <h2 class="text-lg font-medium text-white mb-4">Meine Dienste</h2>
        <div v-if="loading" class="text-center py-4">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"
          ></div>
        </div>
        <div
          v-else-if="services.length === 0"
          class="text-center py-4 text-gray-300"
        >
          Noch keine Dienste vorhanden
        </div>
        <div
          v-else
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="service in services"
            :key="service.id"
            class="bg-gray-800 overflow-hidden shadow rounded-lg"
          >
            <div class="p-4">
              <h3 class="text-lg font-medium text-white">
                {{ service.title }}
              </h3>
              <p class="mt-1 text-sm text-gray-300">
                {{ service.description }}
              </p>
              <div class="mt-4 flex items-center justify-between">
                <div>
                  <span class="text-sm font-medium text-white"
                    >{{ service.price }}€</span
                  >
                  <span class="text-sm text-gray-400 line-through ml-2"
                    >{{ service.original_price }}€</span
                  >
                </div>
                <span
                  :class="[
                    service.is_available
                      ? 'bg-green-900 text-green-100'
                      : 'bg-red-900 text-red-100',
                    'px-2 py-1 text-xs font-medium rounded-full',
                  ]"
                >
                  {{ service.is_available ? "Verfügbar" : "Nicht verfügbar" }}
                </span>
              </div>
            </div>
            <div class="bg-gray-700 px-4 py-3 flex justify-end space-x-2">
              <button
                @click="editService(service)"
                class="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                Bearbeiten
              </button>
              <button
                @click="deleteService(service)"
                class="text-red-400 hover:text-red-300 text-sm font-medium"
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Anfragen -->
      <div>
        <h2 class="text-lg font-medium text-white mb-4">Anfragen</h2>
        <div v-if="loadingRequests" class="text-center py-4">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"
          ></div>
        </div>
        <div
          v-else-if="requests.length === 0"
          class="text-center py-4 text-gray-300"
        >
          Keine Anfragen vorhanden
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="request in requests"
            :key="request.id"
            class="bg-gray-800 overflow-hidden shadow rounded-lg"
          >
            <div class="p-4">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-medium text-white">
                    {{ getServiceTitle(request.service_id) }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-300">
                    {{ request.message }}
                  </p>
                </div>
                <span
                  :class="[
                    getStatusColor(request.status),
                    'px-2 py-1 text-xs font-medium rounded-full',
                  ]"
                >
                  {{ getStatusText(request.status) }}
                </span>
              </div>
              <div class="mt-4 flex justify-end space-x-2">
                <button
                  v-if="request.status === 'pending'"
                  @click="updateRequestStatus(request, 'accepted')"
                  class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                >
                  Annehmen
                </button>
                <button
                  v-if="request.status === 'pending'"
                  @click="updateRequestStatus(request, 'rejected')"
                  class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                >
                  Ablehnen
                </button>
                <button
                  v-if="request.status === 'accepted'"
                  @click="updateRequestStatus(request, 'completed')"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                >
                  Abschließen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  original_price: number;
  is_available: boolean;
  created_at: string;
}

interface ServiceRequest {
  id: string;
  service_id: string;
  message: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  created_at: string;
}

const services = ref<Service[]>([]);
const requests = ref<ServiceRequest[]>([]);
const loading = ref(true);
const loadingRequests = ref(true);

// Lade Dienste
const loadServices = async () => {
  if (!user.value?.id) return;

  try {
    const { data, error } = await client
      .from("services")
      .select("*")
      .eq("provider_id", user.value.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    services.value = data as Service[];
  } catch (error) {
    console.error("Error loading services:", error);
  } finally {
    loading.value = false;
  }
};

// Lade Anfragen
const loadRequests = async () => {
  try {
    const { data, error } = await client
      .from("service_requests")
      .select("*")
      .in(
        "service_id",
        services.value.map((s: Service) => s.id)
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    requests.value = data as ServiceRequest[];
  } catch (error) {
    console.error("Error loading requests:", error);
  } finally {
    loadingRequests.value = false;
  }
};

// Status-Farben und Texte
const getStatusColor = (status: ServiceRequest["status"]) => {
  const colors: Record<ServiceRequest["status"], string> = {
    pending: "bg-yellow-900 text-yellow-100",
    accepted: "bg-green-900 text-green-100",
    rejected: "bg-red-900 text-red-100",
    completed: "bg-blue-900 text-blue-100",
  };
  return colors[status] || "bg-gray-700 text-gray-300";
};

const getStatusText = (status: ServiceRequest["status"]) => {
  const texts: Record<ServiceRequest["status"], string> = {
    pending: "Ausstehend",
    accepted: "Angenommen",
    rejected: "Abgelehnt",
    completed: "Abgeschlossen",
  };
  return texts[status] || status;
};

const getServiceTitle = (serviceId: string) => {
  const service = services.value.find((s: Service) => s.id === serviceId);
  return service?.title || "Unbekannter Dienst";
};

// Service bearbeiten
const editService = (service: Service) => {
  navigateTo(`/provider/services/${service.id}/edit`);
};

// Service löschen
const deleteService = async (service: Service) => {
  if (!confirm("Möchten Sie diesen Dienst wirklich löschen?")) return;

  try {
    const { error } = await client
      .from("services")
      .delete()
      .eq("id", service.id);
    if (error) throw error;
    await loadServices();
  } catch (error) {
    console.error("Error deleting service:", error);
    alert("Fehler beim Löschen des Dienstes");
  }
};

// Anfrage-Status aktualisieren
const updateRequestStatus = async (
  request: ServiceRequest,
  newStatus: ServiceRequest["status"]
) => {
  try {
    const { error } = await client
      .from("service_requests")
      .update({ status: newStatus })
      .eq("id", request.id);

    if (error) throw error;
    await loadRequests();
  } catch (error) {
    console.error("Error updating request status:", error);
    alert("Fehler beim Aktualisieren des Status");
  }
};

// Initial laden
onMounted(async () => {
  await loadServices();
  await loadRequests();
});
</script>
