import ContactClient from "./ContactClient";
import { getContent } from "@/lib/content";

export default async function ContactPage() {
  const content = await getContent('contact');
  return <ContactClient content={content} />;
}
