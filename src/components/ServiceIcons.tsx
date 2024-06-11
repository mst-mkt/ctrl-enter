import {
  IconBan,
  IconBrandBing,
  IconBrandDiscordFilled,
  IconBrandFacebook,
  IconBrandGoogleFilled,
  IconBrandInstagram,
  IconBrandOpenai,
  IconBrandTwitterFilled,
  IconBrandZoom,
  IconMessage,
} from '@tabler/icons-react'
import type { FC } from 'react'
import { match } from 'ts-pattern'
import type { Services } from '~/types/serviceType'

type ServiceIconsProps = {
  service: Services | null
  size?: number
  color: string
  className?: string
}

export const ServiceIcons: FC<ServiceIconsProps> = ({ service, ...props }) =>
  match(service)
    .with('discord', () => <IconBrandDiscordFilled {...props} />)
    .with('twitter', () => <IconBrandTwitterFilled {...props} />)
    .with('instagram', () => <IconBrandFacebook {...props} />)
    .with('facebook', () => <IconBrandInstagram {...props} />)
    .with('zoom', () => <IconBrandZoom {...props} />)
    .with('meet', () => <IconBrandGoogleFilled {...props} />)
    .with('chatgpt', () => <IconBrandOpenai {...props} />)
    .with('bing', () => <IconBrandBing {...props} />)
    .with('gemini', () => <IconBrandGoogleFilled {...props} />)
    .with('claude', () => <IconMessage {...props} />)
    .otherwise(() => <IconBan {...props} />)
