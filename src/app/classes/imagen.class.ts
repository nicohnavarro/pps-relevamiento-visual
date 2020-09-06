import {Voto} from './voto.class';
import { IImage } from '../interfaces/IImage';

export class Imagen implements IImage {
    id:string;
    tipo:string;
    user:string;
    usermail:string;
    votos:string[];
    key:string;
    fecha:string;
    image:string;
}
