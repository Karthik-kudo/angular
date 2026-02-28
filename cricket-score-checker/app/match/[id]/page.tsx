import { matchesData } from "../../data/matches";
import MatchDetailClient from "./MatchDetailClient";

export function generateStaticParams() {
  return matchesData.map((m) => ({ id: String(m.id) }));
}

export default function MatchPage({ params }: { params: { id: string } }) {
  return <MatchDetailClient id={params.id} />;
}
