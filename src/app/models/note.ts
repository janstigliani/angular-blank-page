export interface Note {
    id: number;
    creationDate: Date;
    lastModify?: Date;
    desc: string;
    isSelected: boolean; 
}
