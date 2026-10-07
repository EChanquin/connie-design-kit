import { Footer, Header } from "compositions";
import { AllProviders } from "data";
import { ClaimAnnotationCardDemo } from "./examples/ClaimAnnotationCardDemo";
import { CompoundDesigningWorkshop } from "./examples/CompoundDesigningWorkshop";
import { ConnieStage } from "./examples/ConnieStage";
import { SdsWorkshopWelcomePage } from "./examples/SdsWorkshopWelcomePage";
import { useEffect, useState } from "react";

function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const isSdsWelcome = hash === "#sds-welcome";
  const isConnie = hash === "#connie";
  const isConnieStates = hash === "#connie-states";

  // ConnieStage runs without Header/Footer — full-bleed 1440×900 stage
  if (isConnie) {
    return (
      <AllProviders>
        <ConnieStage />
      </AllProviders>
    );
  }

  return (
    <AllProviders>
      <Header
        logoAriaLabel={
          isConnieStates
            ? "Back to Connie states top"
            : isSdsWelcome
              ? "Back to SDS overview top"
              : "Back to workshop introduction"
        }
        logoHref={
          isConnieStates
            ? "#connie-states"
            : isSdsWelcome
              ? "#sds-welcome-top"
              : "#workshop-hero-heading"
        }
      />
      {isConnieStates ? (
        <ClaimAnnotationCardDemo />
      ) : isSdsWelcome ? (
        <SdsWorkshopWelcomePage />
      ) : (
        <CompoundDesigningWorkshop />
      )}
      <Footer />
    </AllProviders>
  );
}

export default App;
