export class MinistryWorksSLData {
    public ministryWorkID: number;
    public CAMCode: string;
    public formPeopleName: string;
    public formLocation: string;
    public sources: string;
    public status: string;

     constructor(ministryWorkID: number, CAMCode: string, formPeopleName: string, formLocation: string, sources: string, status: string) {
        this.ministryWorkID = ministryWorkID;
        this.CAMCode = CAMCode;
        this.formPeopleName = formPeopleName;
        this.formLocation = formLocation;
        this.sources = sources;
        this.status = status;
    }
}

export class MinistryWorksItemData {
    public ministryWorkID: number;
    public ministryID: number;
    public formPeopleName: string;
    public formLanguage: string;
    public formLocation: string;
    public ROG3: string;
    public ROG4: string;
    public ROG5: string;
    public ROL3: string;
    public ROL4: number;
    public PeopleID2: number;
    public PeopleID3: number;

    
    constructor(ministryWorkID: number, ministryID: number, formPeopleName: string, formLanguage: string, formLocation: string, 
        ROG3: string, ROG4: string, ROG5: string, ROL3: string, ROL4: number, PeopleID2: number, PeopleID3: number) {
        this.ministryWorkID = ministryWorkID;
        this.ministryID = ministryID;
        this.formPeopleName = formPeopleName;
        this.formLanguage = formLanguage;
        this.formLocation = formLocation;
        this.ROG3 = ROG3;
        this.ROG4 = ROG4;
        this.ROG5 = ROG5;
        this.ROL3 = ROL3;
        this.ROL4 = ROL4;
        this.PeopleID2 = PeopleID2;
        this.PeopleID3 = PeopleID3;
    }
}

