import { create } from "zustand";

type User = {
  userId: string;
  email: string;
  display_name: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;

  // actions
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  checkUser: () => Promise<void>;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: false,
  isLoggedIn: false,

  setUser: (user) => set({ user }),

  logout: async () => {
    try {
      localStorage.removeItem("auth_token");
      set({
        user: null,
        loading: false,
        isLoggedIn: false,
      });
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  checkUser: async () => {
    let alreadyLoading = false;
    set((s) => {
      alreadyLoading = s.loading;
      if (!s.loading) return { loading: true };
      return {};
    });
    if (alreadyLoading) return;

    try {
      const auth_token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

      if (!auth_token) {
        // No token -> clear state
        set({
          user: null,
          isLoggedIn: false,
          loading: false,
        });
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${auth_token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data)

      if (res.ok && data?.user) {
        set({
          user: data.user,
          isLoggedIn: true,
          loading: false,
        });
      } else {
        set({
          user: null,
          isLoggedIn: false,
          loading: false,
        });
      }
    } catch (err) {
      set({
        user: null,
        isLoggedIn: false,
        loading: false,
      });
    }
  },
}));
