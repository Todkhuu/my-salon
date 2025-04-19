"use client";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { CustomInput } from "./CustomInput";

type TabType = "login" | "register";

interface RegisterFormProps {
  setTab: Dispatch<SetStateAction<TabType>>;
}

export const TabRegister = ({ setTab }: RegisterFormProps) => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validate = () => {
    let valid = true;
    let newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!registerData.username) {
      newErrors.username = "Username заавал бөглөнө.";
      valid = false;
    }

    // Email validation
    if (!registerData.email) {
      newErrors.email = "Email хоосон байна.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = "Буруу email формат.";
      valid = false;
    }

    // Password validation
    if (!registerData.password) {
      newErrors.password = "Нууц үг хоосон байна.";
      valid = false;
    }

    // Confirm Password validation
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Нууц үг таарахгүй байна.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const res = await axios.post("/api/signup", {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      });

      toast.success("Бүртгэл амжилттай үүслээ!");
      setTab("login");
    } catch (error) {}
  };

  return (
    <TabsContent value="register">
      <form onSubmit={handleRegister} className="space-y-4 pt-4">
        <CustomInput
          id="username"
          label="Username"
          value={registerData.username}
          onChange={handleChange}
          // required
          error={errors.username}
        />
        <CustomInput
          id="email"
          label="Email"
          type="email"
          value={registerData.email}
          onChange={handleChange}
          placeholder="m@example.com"
          // required
          error={errors.email}
        />
        <CustomInput
          id="password"
          label="Password"
          type="password"
          value={registerData.password}
          onChange={handleChange}
          // required
          error={errors.password}
        />
        <CustomInput
          id="confirmPassword"
          label="Password"
          type="password"
          value={registerData.confirmPassword}
          onChange={handleChange}
          // required
          error={errors.confirmPassword}
        />
        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          Create Account
        </Button>
      </form>
    </TabsContent>
  );
};
