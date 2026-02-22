import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import NewHomePage from "@/components/NewHome/NewHomePage";

export const dynamic = 'force-dynamic';

async function getInsights() {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
    const res = await fetch(`${API_BASE}/insights?status=published&limit=3`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch insights:', error);
    return [];
  }
}

export default async function Home() {
  const insights = await getInsights();
  
  return (
    <>
      <MegaMenuHeader />
      <main id="main-content">
        <NewHomePage insights={insights} />
      </main>
      <Footer />
    </>
  );
}
