export class Contenido {
    public Nombre: string;
    public Imagen: string;
    public Rating: string;
    public Tipo: string;
    public Id: number;
    //public Actores: string[];
}

export class Serie {
    public Nombre: string;
    public Id: number;
    public Imagen: string;
    public Rating: string;
    public NumTemporadas: number;
    public Temporadas: [];
}

export class Episodio{
    public Nombre: string;
    public Numero:number;
}