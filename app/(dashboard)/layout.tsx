import BottomNav from "@/components/navbar/Navbar";

import Container from "@/components/global/container";

import { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
  return (
    <main>
      <Container className="py-20">{children}</Container>
      <BottomNav />
    </main>
  );
}
export default layout;
