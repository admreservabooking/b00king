# Análise da Página de Reserva - Booking.com

## Estrutura Visual

### Layout Geral
- **Duas colunas**: Esquerda (informações do hotel) | Direita (formulário)
- **Largura máxima**: ~1200px, centralizado
- **Padding**: Generoso em desktop, responsivo em mobile

### Coluna Esquerda (Hotel Info)
1. **Foto do Hotel**: Imagem retangular (~400x300px), com cantos ligeiramente arredondados
2. **Nome do Hotel**: Título grande, bold, com badge de estrelas
3. **Endereço**: Texto pequeno, cinza
4. **Rating**: Badge azul com número (ex: 8.8), label "Excellent"
5. **Amenidades**: Ícones + texto (Pet friendly, Free WiFi, Parking, Swimming pool)
6. **Seção "Your booking details"**: 
   - Check-in e Check-out em destaque
   - Número de hóspedes
   - Preço total em grande destaque
   - Botão "Change your selection"

### Coluna Direita (Formulário)
1. **Progresso**: 1. Your Selection | 2. Your Details | 3. Finish booking
2. **Seção "Enter your details"**:
   - Campos de texto: First name, Last name, Email
   - Select: Country/Region
   - Input: Phone number
   - Checkboxes: Paperless confirmation, Who are you booking for
3. **Seção "Standard Double Room"**:
   - Informações da sala
   - Amenidades do quarto
4. **Seção "Add to your stay"**:
   - Checkboxes para voos, carros, transfers
5. **Seção "Special requests"**:
   - Textarea para pedidos especiais
6. **Seção "Your arrival time"**:
   - Select para horário estimado
7. **Botões**:
   - "Next: Final details" (azul, destaque)
   - "What are my booking conditions?" (link)

## Paleta de Cores
- **Azul primário**: #003580 (botões, links, badges)
- **Cinza claro**: #F0F0F0 (backgrounds de seções)
- **Cinza escuro**: #333333 (textos principais)
- **Cinza médio**: #666666 (textos secundários)
- **Branco**: #FFFFFF (fundo geral)
- **Vermelho**: #E74C3C (avisos, erros)

## Tipografia
- **Títulos**: Font-weight 700, size 24-32px
- **Subtítulos**: Font-weight 600, size 16-18px
- **Corpo**: Font-weight 400, size 14-16px
- **Labels**: Font-weight 500, size 12-14px

## Componentes Principais
1. **Card de Hotel**: Foto + Info com sombra leve
2. **Badge de Rating**: Fundo azul, texto branco, arredondado
3. **Input Fields**: Border cinza, focus azul
4. **Checkboxes**: Customizados, azul quando selecionados
5. **Buttons**: Azul sólido, hover mais escuro
6. **Dividers**: Linhas cinza claro entre seções

## Responsividade
- **Desktop**: Duas colunas lado a lado
- **Tablet**: Colunas empilhadas, menos padding
- **Mobile**: Full width, single column

## Animações
- Hover em botões: Transição suave de cor
- Focus em inputs: Border azul com sombra leve
- Transições gerais: 200-300ms ease-in-out
