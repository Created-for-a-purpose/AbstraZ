import TwitterProvider from "next-auth/providers/twitter";

export const authConfig = {
  providers: [
    TwitterProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      version: "2.0",
    }),
  ],
  callbacks: {
    async redirect({ url }) {
      if (url === "/api/auth/signin") {
        return Promise.resolve("/dashboard/zkp");
      }
      return Promise.resolve("/dashboard/zkp");
    },
    async jwt({ token, account }) {
        return {...token, ...account};
    },
    async session({ session, token, user }) {
        session.user = {...token, ...user};
        return session;
    }
  },
};
