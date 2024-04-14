import { Filters, ServiceCard } from "@/components/custom";
import axios from "@/api";
import { ServiceDTO } from "@/types/courses";

const getServices = async () => {
  try {
    const { data } = await axios.get<ServiceDTO[]>("/services");

    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      {services?.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </>
  );
}
