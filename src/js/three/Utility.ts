export default class Util {
    public static rad = (deg: number) => deg * (Math.PI/180);
    public static rand_r = (max:number,min?: number): number =>min?min + Math.round(Math.random()* (max-min)):Math.round(Math.random()*max);
}