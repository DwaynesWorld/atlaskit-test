---
to: src/app.tsx
---
import { Switch, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { SiteLayout } from "./components/site-layout";
import { NotFound } from "./components/not-found";
import { LoadingFallback } from "./components/loading-fallback";

const About = lazy(() => import("./pages/about"));

export const App = () => {
  return (
    <SiteLayout>
      <Suspense fallback={<LoadingFallback/>}>
        <Switch>
          {/* add your routes here */}

          <Route exact path="/">
            <About />
          </Route>
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </SiteLayout>
  );
};
