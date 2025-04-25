"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/app/_context/UserContext";
import { FormField } from "./FormField";
import { SubjectSelect } from "./SubjectSelect";
import { SubmissionSuccess } from "./SubmissionSuccess";

export const ContactForm = () => {
  const { user, isAuthenticated } = useUser();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormState((prev) => ({
        ...prev,
        name: user.username || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
      }));
    }
  }, [isAuthenticated, user]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formState.name.trim()) errors.name = "Нэр шаардлагатай";
    if (!formState.email.trim()) {
      errors.email = "N-мэйл шаардлагатай";
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      errors.email = "Баталгаат и-мэйл хаяг оруулна уу";
    }
    if (!formState.subject) errors.subject = "Сэдэв сонгоно уу";
    if (!formState.message.trim()) errors.message = "Зурвас шаардлагатай";
    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  if (isSubmitted)
    return <SubmissionSuccess onReset={() => setIsSubmitted(false)} />;

  return (
    <>
      <h2 className="mb-6 text-3xl font-bold">Бидэнд зурвас илгээнэ үү</h2>

      {isAuthenticated && (
        <div className="mb-4 rounded-md bg-blue-50 p-3 text-blue-800">
          <p>
            Тавтай морил! Бид таны бүртгэлээс мэдээллийг автоматаар бөглөлөө.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          id="name"
          label="Нэр"
          required
          value={formState.name}
          onChange={handleChange}
          error={formErrors.name}
          placeholder="Таны нэр"
        />
        <FormField
          id="email"
          label="И-мэйл"
          required
          type="email"
          value={formState.email}
          onChange={handleChange}
          error={formErrors.email}
          placeholder="email@example.com"
        />
        <FormField
          id="phone"
          label="Утас (заавал биш)"
          type="tel"
          value={formState.phone}
          onChange={handleChange}
          placeholder="00000000"
        />
        <SubjectSelect
          value={formState.subject}
          onChange={(val) => {
            setFormState((prev) => ({ ...prev, subject: val }));
            if (formErrors.subject)
              setFormErrors((prev) => ({ ...prev, subject: "" }));
          }}
          error={formErrors.subject}
        />
        <FormField
          id="message"
          label="Зурвас"
          required
          value={formState.message}
          onChange={handleChange}
          error={formErrors.message}
          isTextarea
          placeholder="Бид танд хэрхэн туслах вэ?"
        />

        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Илгээж байна...
            </>
          ) : (
            "Зурвас илгээх"
          )}
        </Button>
      </form>
    </>
  );
};
