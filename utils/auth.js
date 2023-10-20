import TwitterProvider from "next-auth/providers/twitter";

export const authConfig = {
  providers: [
    TwitterProvider({
      clientId: "aDc2UEtIQVZLQmJ5cUEycU5oX3c6MTpjaQ",
      clientSecret: "RZvOOJXUue-oJL5YzcmO-Fm9yXOHjEPPE_p1qKo4-3zU_dwpv4",
      version: "2.0",
    }),
  ],
  callbacks: {
    async redirect({ url }) {
      if (url === "/api/auth/signin") {
        return Promise.resolve("/test");
      }
      return Promise.resolve("/test");
    },
    async jwt({ token, account }) {
        return {...token, ...account};
    },
    async session({ session, token, user }) {
        session.user = token
        return session;
    }
  },
};
