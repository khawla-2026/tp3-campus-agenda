import { View, Text, StyleSheet, FlatList } from "react-native";
type Evenement = {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
};

const evenements: Evenement[] = [
  { id: "E01", titre: "Atelier React", categorie: "Atelier", capacite: 25, inscrits: 25 },
  { id: "E02", titre: "Conférence IA", categorie: "Conférence", capacite: 70, inscrits: 52 },
  { id: "E03", titre: "Sécurité mobile", categorie: "Atelier", capacite: 20, inscrits: 17 },
  { id: "E04", titre: "Design UI", categorie: "Atelier", capacite: 18, inscrits: 9 },
  { id: "E05", titre: "Forum projets", categorie: "Rencontre", capacite: 50, inscrits: 49 },
  { id: "E06", titre: "Découverte Git", categorie: "Atelier", capacite: 24, inscrits: 24 },
];

function placesRestantes(e: Evenement): number {
  return Math.max(0, e.capacite - e.inscrits);
}

function statutEvenement(e: Evenement): string {
  const places = placesRestantes(e);

  if (places === 0) {
    return "Complet";
  } else if (places <= 3) {
    return "Presque complet";
  } else {
    return "Ouvert";
  }
}

const nombreTotal = evenements.length;

const nombreComplets = evenements.filter(
  (e) => placesRestantes(e) === 0
).length;

const nombreAvecPlaces = evenements.filter(
  (e) => placesRestantes(e) > 0
).length;

const totalPlaces = evenements.reduce(
  (total, e) => total + placesRestantes(e),
  0
);

const ateliersDisponibles = evenements.filter(
  (e) => e.categorie === "Atelier" && placesRestantes(e) > 0
);
  type BadgeEtatProps = {
  statut: string;
};

function BadgeEtat({ statut }: BadgeEtatProps) {
  const couleur =
    statut === "Complet"
      ? "#f8d7da"
      : statut === "Presque complet"
      ? "#ffe5b4"
      : "#d4edda";

  return (
    <View style={{ backgroundColor: couleur, padding: 8, borderRadius: 10 }}>
      <Text>{statut}</Text>
    </View>
  );
}

type CarteEvenementProps = {
  evenement: Evenement;
};

function CarteEvenement({ evenement }: CarteEvenementProps) {
  const places = placesRestantes(evenement);
  const statut = statutEvenement(evenement);

  return (
    <View style={{ padding: 15, margin: 8, backgroundColor: "#ffffff", borderRadius: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {evenement.titre}
      </Text>
      <Text>Catégorie : {evenement.categorie}</Text>
      <Text>{places} places restantes</Text>
      <BadgeEtat statut={statut} />
    </View>
  );
}

type BlocStatistiqueProps = {
  libelle: string;
  nombre: number;
};

function BlocStatistique({ libelle, nombre }: BlocStatistiqueProps) {
  return (
    <View style={{ padding: 12, margin: 5, backgroundColor: "#eeeeee", borderRadius: 10 }}>
      <Text>{libelle}</Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{nombre}</Text>
    </View>
  );
}
export default function App() {
  const mode = "tous";

  const evenementsAffiches =
    mode === "tous"
      ? evenements
      : evenements.filter(
          (e) => e.categorie === "Atelier" && placesRestantes(e) > 0
        );
  return (
    <View style={styles.container}>
      <Text style={styles.titre}>CampusAgenda</Text>

      <Text style={styles.sousTitre}>
        Événements du campus
      </Text>

      <View style={styles.statistiques}>
        <BlocStatistique
          libelle="Événements au total"
          nombre={nombreTotal}
        />

        <BlocStatistique
          libelle="Événements complets"
          nombre={nombreComplets}
        />

        <BlocStatistique
          libelle="Événements avec des places"
          nombre={nombreAvecPlaces}
        />

        <BlocStatistique
          libelle="Places restantes"
          nombre={totalPlaces}
        />
      </View>

        <Text style={styles.titreListe}>
  {mode === "tous" ? "Tous les événements" : "Ateliers disponibles"}
      </Text>

      <FlatList
        data={evenementsAffiches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarteEvenement evenement={item}/>
         )} 
          ListEmptyComponent={
  <Text style={{ textAlign: "center", marginTop: 20 }}>
    Aucun événement à afficher.
  </Text>
} 
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },

  titre: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    color: "#2c3e50",
  },

  sousTitre: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },

  statistiques: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  titreListe: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 15,
  },
});