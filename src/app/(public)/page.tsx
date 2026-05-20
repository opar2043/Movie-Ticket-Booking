import { cookies } from "next/headers";
import Banner from "@/src/app/components/Layout/Banner";
import GetToKnowUs from "@/src/app/components/Layout/Gettoknowus";
import AboutPage from "./about/page";
import { userRoute } from "../components/service/users";
import HomeMovies from "../components/Layout/HomeMovies";
import Testimonials from "../components/Layout/Testimonials";

export default async function Home() {
  let user = null;
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();
    user = await userRoute.getMe({
      headers: { Cookie: cookieString },
    });
  } catch (error) {
    console.error("Error fetching user in Home:", error);
  }

  return (
    <main className="bg-[#121315]">
      <Banner />
      <HomeMovies />
      <Testimonials />
      <GetToKnowUs />
      <AboutPage embedded />
    </main>
  );
}
