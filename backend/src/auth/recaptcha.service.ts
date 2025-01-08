import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RecaptchaService {
  private readonly RECAPTCHA_SECRET_KEY = '6LeN6bAqAAAAABlznoZuVBu5y0elSnezyffl5Kdp';

  async verifyRecaptcha(token: string): Promise<void> {
    try {
      const response = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        {},
        {
          params: {
            secret: this.RECAPTCHA_SECRET_KEY,
            response: token,
          },
        },
      );

      if (!response.data.success) {
        throw new BadRequestException('Captcha verification failed');
      }
    } catch (error) {
      throw new BadRequestException('Captcha verification failed');
    }
  }
}
