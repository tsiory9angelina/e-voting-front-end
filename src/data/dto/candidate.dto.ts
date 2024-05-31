export default interface CandidateDTO {
  _id: string;
  name: string;
  firstname: string;
  dateBirth: Date | null;
  birthLocation: string;
  cin: string;
  dateCin: Date | null;
  locationCin: string;
  imageUrl: File | null; // Ajout de l'image en tant que type File ou null
  partyEntity: string;
  compaingLocation: string;
  description: string;
}
