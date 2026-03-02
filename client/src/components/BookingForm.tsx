'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CreditCard } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
  phoneConfirmation: string;
  towels: number;
  checkInTime: string;
  paperlessConfirmation: boolean;
  bookingFor: 'self' | 'other';
  workTravel: 'yes' | 'no' | 'not-specified';
  specialRequests: string;
  arrivalTime: string;
}

interface BookingFormProps {
  onSubmit?: (data: BookingFormData) => void;
  totalPrice: number;
  paymentLink30?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  details?: string[];
  propertyName?: string;
  roomType?: string;
  breakfastIncluded?: boolean;
  freeCancellationDate?: string;
  mainGuestName?: string;
  guestCount?: number;
}

export default function BookingForm({ onSubmit, totalPrice, paymentLink30, clientName, clientEmail, clientPhone, details, propertyName, roomType, breakfastIncluded, freeCancellationDate, mainGuestName, guestCount }: BookingFormProps) {
  /* Booking.com Official Design */
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    country: 'BR',
    phone: '',
    phoneConfirmation: '',
    towels: 2,
    checkInTime: '14:00',
    paperlessConfirmation: true,
    bookingFor: 'self',
    workTravel: 'not-specified',
    specialRequests: '',
    arrivalTime: '',
  });

  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'full' | '30percent' | null>(null);

  const handleChange = (field: keyof BookingFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const price30Percent = (totalPrice * 0.3).toFixed(2);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!showPayment ? (
        <>
          {/* Confirm Your Details Section - Fixed Display */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-foreground mb-1">
                Confirme seus dados
              </h3>
              <p className="text-xs text-muted-foreground">
                Suas informações de reserva
              </p>
            </div>

            {/* Name - Fixed Display */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold">
                Nome
              </Label>
              <div className="px-3 py-2 border border-border rounded-sm bg-muted text-sm text-foreground">
                {clientName || 'João Silva'}
              </div>
            </div>

            {/* Email - Fixed Display */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold">
                Endereço de e-mail
              </Label>
              <div className="px-3 py-2 border border-border rounded-sm bg-muted text-sm text-foreground">
                {clientEmail || 'hospede@booking.example.com'}
              </div>
            </div>

            {/* Phone - Fixed Display */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold">
                Número de telefone
              </Label>
              <div className="px-3 py-2 border border-border rounded-sm bg-muted text-sm text-foreground">
                {clientPhone || '+55 (11) 99999-9999'}
              </div>
            </div>
          </div>

          {/* Reservation Details Section */}
          <div className="border-t border-border pt-4 space-y-2">
            <h3 className="font-bold text-foreground text-sm mb-2">Detalhes da Reserva</h3>
            {details && details.map((detail, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span className="text-foreground text-xs">{detail}</span>
              </div>
            ))}
          </div>

          {/* Special Requests Section */}
          <div className="border-t border-border pt-4 space-y-2">
            <div>
              <h3 className="font-bold text-foreground text-sm mb-1">Pedidos especiais</h3>
              <p className="text-xs text-muted-foreground mb-2">
                Pedidos especiais não podem ser garantidos, mas a propriedade fará o seu melhor para atender suas necessidades.
              </p>
            </div>
            <textarea
              placeholder="Escreva seus pedidos em português (opcional)"
              value={formData.specialRequests}
              onChange={(e) => handleChange('specialRequests', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-sm focus:border-primary focus:ring-primary transition-colors resize-none text-sm"
              rows={3}
            />
          </div>

          {/* Arrival Time Section */}
          <div className="border-t border-border pt-4 space-y-3">
            <div>
              <h3 className="font-bold text-foreground text-sm mb-1">O seu horário de chegada</h3>
              <p className="text-xs text-muted-foreground mb-3">
                O seu quarto estará pronto para check-in entre as 08:00 e as 00:00
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-sm p-3 mb-3">
                <p className="text-xs text-foreground font-semibold">Recepção 24 horas</p>
                <p className="text-xs text-muted-foreground">A dar apoio sempre que precisar!</p>
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="arrivalTime" className="text-xs font-semibold">
                Adicione o seu horário de chegada estimado
              </Label>
              <Input
                id="arrivalTime"
                type="time"
                value={formData.arrivalTime}
                onChange={(e) => handleChange('arrivalTime', e.target.value)}
                className="border-border focus:border-primary focus:ring-primary transition-colors text-sm"
              />
            </div>
          </div>

          {/* Who are you booking for */}
          <div className="border-t border-border pt-4 space-y-2">
            <p className="text-xs font-semibold">
              Para quem está a reservar? (opcional)
            </p>
            <div className="flex items-center gap-3">
              <Checkbox
                id="self"
                checked={formData.bookingFor === 'self'}
                onCheckedChange={() => handleChange('bookingFor', 'self')}
                className="border-border"
              />
              <Label htmlFor="self" className="text-xs cursor-pointer">
                Eu sou o(a) hóspede principal
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                id="other"
                checked={formData.bookingFor === 'other'}
                onCheckedChange={() => handleChange('bookingFor', 'other')}
                className="border-border"
              />
              <Label htmlFor="other" className="text-xs cursor-pointer">
                A reservar para outra pessoa
              </Label>
            </div>
          </div>

          {/* Phone Confirmation and Towels */}
          <div className="border-t border-border pt-4 space-y-4">
            <div className="space-y-1">
              <Label htmlFor="phoneConfirmation" className="text-xs font-semibold">
                Confirmar Número de Telefone <span className="text-red-600">*</span>
              </Label>
              <Input
                id="phoneConfirmation"
                placeholder="Confirme seu número de telefone"
                value={formData.phoneConfirmation}
                onChange={(e) => handleChange('phoneConfirmation', e.target.value)}
                required
                className="border-border focus:border-primary focus:ring-primary transition-colors text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="towels" className="text-xs font-semibold">
                Quantidade de Toalhas
              </Label>
              <Input
                id="towels"
                type="number"
                min="1"
                max="10"
                value={formData.towels}
                onChange={(e) => handleChange('towels', parseInt(e.target.value))}
                className="border-border focus:border-primary focus:ring-primary transition-colors text-sm"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="border-t border-border pt-4 flex gap-3">
            <Button
              type="button"
              onClick={() => setShowPayment(true)}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-2 rounded-sm transition-colors text-sm"
            >
              Próximo: Detalhes finais
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Payment Section */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-foreground text-lg mb-2">
                Escolha a forma de pagamento
              </h3>
              <p className="text-xs text-muted-foreground">
                Selecione como deseja pagar sua reserva
              </p>
            </div>

            {/* Full Payment Option */}
            <div
              onClick={() => setPaymentMethod('full')}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                paymentMethod === 'full'
                  ? 'border-primary bg-blue-50'
                  : 'border-border hover:border-primary'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    paymentMethod === 'full'
                      ? 'border-primary bg-primary'
                      : 'border-border'
                  }`}
                >
                  {paymentMethod === 'full' && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground text-sm">
                    Pagar 100% agora
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pague o valor total de R$ {totalPrice.toFixed(2)} no cartão de crédito
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary text-lg">
                    R$ {totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* 30% Payment Option */}
            {paymentLink30 && (
              <div
                onClick={() => setPaymentMethod('30percent')}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  paymentMethod === '30percent'
                    ? 'border-primary bg-blue-50'
                    : 'border-border hover:border-primary'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      paymentMethod === '30percent'
                        ? 'border-primary bg-primary'
                        : 'border-border'
                    }`}
                  >
                    {paymentMethod === '30percent' && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                  <h4 className="font-bold text-foreground text-sm">
                    Pagar 30% agora
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pague apenas 30% da reserva e o restante na chegada
                  </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary text-lg">
                      R$ {price30Percent}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      de R$ {totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Methods */}
            {paymentMethod === 'full' && (
              <div className="border-t border-border pt-6 space-y-4">
                <h4 className="font-bold text-foreground text-sm">
                  Dados do cartão
                </h4>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="cardName" className="text-xs font-semibold">
                      Nome do titular
                    </Label>
                    <Input
                      id="cardName"
                      placeholder="Como aparece no cartão"
                      className="mt-1 text-sm"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber" className="text-xs font-semibold">
                      Número do cartão
                    </Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="mt-1 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="expiry" className="text-xs font-semibold">
                        Validade
                      </Label>
                      <Input
                        id="expiry"
                        placeholder="MM/AA"
                        className="mt-1 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-xs font-semibold">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        className="mt-1 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 30% Payment Link Section */}
            {paymentMethod === '30percent' && paymentLink30 && (
              <div className="border-t border-border pt-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Clique no botão abaixo para ir para o link de pagamento de 30%
                </p>
              </div>
            )}

            {/* Marketing Consent and Booking Terms */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="marketing"
                  defaultChecked
                  className="mt-1"
                />
                <Label htmlFor="marketing" className="text-xs text-muted-foreground cursor-pointer">
                  Concordo em receber e-mails de marketing, incluindo promoções, recomendações personalizadas, recompensas, experiências de viagem e atualizações sobre os produtos e serviços.
                </Label>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                A reserva é feita diretamente com <span className="font-semibold text-foreground">{propertyName || 'Seu Imóvel'}</span>, ou seja, ao completar esta reserva, concorda com as <span className="text-primary cursor-pointer hover:underline">condições da reserva</span>, os <span className="text-primary cursor-pointer hover:underline">termos gerais</span>, a <span className="text-primary cursor-pointer hover:underline">política de privacidade</span> e os <span className="text-primary cursor-pointer hover:underline">termos da Carteira</span>.
              </p>
            </div>



            {/* Payment Buttons */}
            <div className="border-t border-border pt-4 flex gap-3">
              {paymentMethod === 'full' ? (
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-sm transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Terminar reserva
                </Button>
              ) : paymentMethod === '30percent' && paymentLink30 ? (
                <a
                  href={paymentLink30}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    type="button"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-sm transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Terminar reserva
                  </Button>
                </a>
              ) : null}

              <Button
                type="button"
                onClick={() => setShowPayment(false)}
                variant="outline"
                className="border-border hover:bg-secondary text-sm"
              >
                Voltar
              </Button>
            </div>
          </div>
        </>
      )}
    </form>
  );
}
