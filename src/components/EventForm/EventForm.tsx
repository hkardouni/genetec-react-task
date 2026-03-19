import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEventStore } from "../../store/useEventStore";
import type { EventItem } from "../../types";
import { useEffect } from "react";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
});


type FormData = z.infer<typeof schema>;

type Props = {
  onSuccess?: () => void;
  initialData?: EventItem | null;
};


export const EventForm = ({ onSuccess, initialData }: Props) => {

  useEffect(() => {
  if (initialData) {
    setValue("title", initialData.title);
    setValue("date", initialData.date.slice(0, 10));
  }
}, [initialData]);

  const addEvent = useEventStore((s) => s.addEvent);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const updateEvent = useEventStore((s) => s.updateEvent);

const onSubmit = (data: FormData) => {
  if (initialData) {
    updateEvent({
      ...initialData,
      ...data,
    });
  } else {
    addEvent({
      id: new Date(data.date).toISOString(),
      ...data,
    });
  }

  onSuccess?.();
};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Title"
        {...register("title")}
        style={{
          padding: "8px",
          width: "100%",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />
      {errors.title && <p>{errors.title.message}</p>}

      <input
        type="date"
        {...register("date")}
        style={{
          padding: "8px",
          width: "100%",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />
      {errors.date && <p>{errors.date.message}</p>}

      <button type="submit">Save</button>
    </form>
  );
};
