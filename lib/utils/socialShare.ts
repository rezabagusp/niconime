export const fbURL = 'https://www.facebook.com/sharer/sharer.php?u=';
export const twitterURL = 'https://twitter.com/share?url=';
export const whatsappURL = 'https://api.whatsapp.com/send?text=';
export const linkedinURL = 'https://www.linkedin.com/sharing/share-offsite/?url=';

export const socialShareRedirection = (
  whichURL: 'facebook' | 'twitter' | 'whatsapp' | 'linkedin',
  title?: string,
): void => {
  const enTitle = title ? encodeURIComponent(title) : '';

  switch (whichURL) {
  case 'facebook':
    window.open(fbURL + window.location.href, 'targetWindow', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250');
    break;

  case 'twitter':
    window.open(`${twitterURL + window.location.href}&text=${enTitle}`, 'targetWindow', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250');
    break;

  case 'whatsapp':
    window.open(`${whatsappURL + window.location.href} ${enTitle}`, 'targetWindow', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250');
    break;

    case 'linkedin':
    window.open(`${linkedinURL + window.location.href}`, 'targetWindow', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250');
    break;

  default:
  }
};
