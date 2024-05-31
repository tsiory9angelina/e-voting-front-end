export default interface VoterDTO {
  cin: string;
  name: string;
  firstname: string;
  gender: string;
  birthDate: Date | null;
  birthLocation: string;
  dateCin: Date | null;
  locationCin: string;
  address: string;
  email: string;
  station ?: string;
}