
// Middleware d'authentification (auth.middleware.ts)
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        req['user'] = decoded; // Ajouter les données de l'utilisateur à l'objet de requête
      } catch (error) {
        // Le jeton est invalide
        console.error('Token verification failed:', error);
      }
    }
    next();
  }
}