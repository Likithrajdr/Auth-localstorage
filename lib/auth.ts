"use client";

export interface User {
  id: string;
  email: string;
  password: string;
}

export const auth = {
  signup: (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find((user: User) => user.email === email);
    if (exists) throw new Error("User already exists");

    const newUser = { id: crypto.randomUUID(), email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return newUser;
  },

  signin: (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: User) => u.email === email && u.password === password
    );
    if (!user) throw new Error("Invalid credentials");

    localStorage.setItem("currentUser", JSON.stringify(user));
    return user;
  },

  resetPassword: (email: string, newPassword: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u: User) => u.email === email);
    if (userIndex === -1) throw new Error("User not found");

    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  },

  logout: () => {
    localStorage.removeItem("currentUser");
  },
};
