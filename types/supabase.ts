export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          address: string | null
          role: "provider" | "customer" | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          address?: string | null
          role?: "provider" | "customer" | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          address?: string | null
          role?: "provider" | "customer" | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          provider_id: string
          title: string
          description: string
          price: number
          original_price: number
          category: string
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          provider_id: string
          title: string
          description: string
          price: number
          original_price: number
          category: string
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          provider_id?: string
          title?: string
          description?: string
          price?: number
          original_price?: number
          category?: string
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      service_requests: {
        Row: {
          id: string
          service_id: string
          user_id: string
          message: string
          status: "pending" | "accepted" | "rejected" | "completed"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          service_id: string
          user_id: string
          message: string
          status?: "pending" | "accepted" | "rejected" | "completed"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          service_id?: string
          user_id?: string
          message?: string
          status?: "pending" | "accepted" | "rejected" | "completed"
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          message?: string
          is_read?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Service = {
  id: string;
  provider_id: string;
  title: string;
  description: string;
  price: number;
  original_price: number;
  category: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
};

export type ServiceInsert = Omit<Service, "id" | "created_at" | "updated_at">;
export type ServiceUpdate = Partial<Omit<Service, "id" | "created_at" | "updated_at">>; 