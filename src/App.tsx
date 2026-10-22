import { Footer, Header } from "compositions";
import { AllProviders } from "data";
import { useEffect, useState } from "react";
import { ClaimAnnotationCardDemo } from "./examples/ClaimAnnotationCardDemo";
import { ConnieStage } from "./examples/ConnieStage";
import { Storyboard } from "./examples/Storyboard";
import {
  WALKTHROUGH_HASHES,
  Walkthrough,
} from "./examples/walkthrough/Walkthrough";

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
        <Header
          logoAriaLabel="Back to Connie states top"
          logoHref="#connie-states"
        />
        <ClaimAnnotationCardDemo />
        <Footer />
      </AllProviders>
    );
  }

  if (hash === "#storyboard") {
    return <Storyboard />;
  }

  // One route per journey stage (#install ... #check-in). "#connie" and "/" stay the claim check.
  if (WALKTHROUGH_HASHES.includes(hash)) {
    return <Walkthrough hash={hash} />;
  }

  // Default (no hash, #connie, or anything else) → ConnieStage
  return (
    <AllProviders>
      <ConnieStage />
    </AllProviders>
  );
}

export default App;
