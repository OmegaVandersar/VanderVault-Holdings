import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { analytics } from "../data/analytics";

export default function VisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    analytics.trackVisit();
  }, [location.pathname]);

  return null;
}
