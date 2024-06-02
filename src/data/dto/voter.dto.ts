export default interface VoterDTO {
  cin: string;
  name: string;
  firstname: string;
  gender: string;
  birthDate: string | Date | null;
  birthLocation: string;
  dateCin: string | Date | null;
  locationCin: string;
  address: string;
  email: string;
  station ?: string;
}