import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import { Button, PrimaryButton } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Button versátil con múltiples variantes, tamaños y estados. Incluye soporte para iconos, loading y accesibilidad completa.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link'],
      description: 'Variante visual del botón',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del botón',
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carga con spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado deshabilitado',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Botón de ancho completo',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Comprar ahora',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Agregar al carrito',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Ver detalles',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Cancelar',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Ver más productos',
    variant: 'link',
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: 'Agregar al carrito',
    variant: 'primary',
    leftIcon: <ShoppingCart size={16} />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Continuar',
    variant: 'primary',
    rightIcon: <ArrowRight size={16} />,
  },
};

export const Loading: Story = {
  args: {
    children: 'Procesando...',
    variant: 'primary',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'No disponible',
    variant: 'primary',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Finalizar compra',
    variant: 'primary',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Pequeño</Button>
      <Button size="md">Mediano</Button>
      <Button size="lg">Grande</Button>
    </div>
  ),
};

export const EcommerceActions: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <PrimaryButton leftIcon={<ShoppingCart size={16} />}>
        Agregar al carrito
      </PrimaryButton>
      <Button variant="secondary" leftIcon={<Heart size={16} />}>
        Agregar a favoritos
      </Button>
      <Button variant="outline" fullWidth>
        Comparar producto
      </Button>
      <Button variant="link">Ver productos similares</Button>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

