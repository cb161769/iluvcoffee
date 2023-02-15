import { SetMetadata } from "@nestjs/common";
/**
 * @decorator Public
 * @description: este decorador es para delimitar cuales son los endpoints publicos, los cuales no necesitan authentication.
 * @returns 
 */
export const Public = () => SetMetadata( "isPublic", true );