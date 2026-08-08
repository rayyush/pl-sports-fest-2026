import TournamentCard from "../../components/TournamentCard";

function Tournament() {
  return (
    <main className="page">
      <div className="page-header">
        <p>PL SPORTS FEST 2026</p>

        <h1>Choose Your Tournament</h1>

        <span>Select a section to explore the available sports.</span>
      </div>

      <div className="tournament-grid">
        <TournamentCard
          type="indoor"
          title="Indoor Games"
          description="Table Tennis, Chess, Carrom and Pool."
          icon="🏠"
        />

        <TournamentCard
          type="outdoor"
          title="Outdoor Sports"
          description="Badminton, Football, Basketball and Tennis."
          icon="🌳"
        />

        <TournamentCard
          type="field-games"
          title="Field Games"
          description="Special athletic events on 15 August."
          icon="🏃"
          date="15 August 2026"
        />
      </div>
    </main>
  );
}

export default Tournament;
