import { Footer, Header } from "compositions";
import { AllProviders } from "data";
import { ClaimAnnotationCardDemo } from "./examples/ClaimAnnotationCardDemo";
import { ConnieStage } from "./examples/ConnieStage";
import { useEffect, useState } from "react";

function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const isConnieStates = hash === "#connie-states";

  if (isConnieStates) {
    return (
      <AllProviders>
        <Header logoAriaLabel="Back to Connie states top" logoHref="#connie-states" />
        <ClaimAnnotationCardDemo />
        <Footer />
      </AllProviders>
    );
  }

  // Default (no hash, #connie, or anything else) → ConnieStage
  return (
    <AllProviders>
      <ConnieStage />
    </AllProviders>
  );
}

export default App;
