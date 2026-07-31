import type { SupplierComponent } from '@/types'

// Gedeelde platformonderdelen die door leveranciers worden geleverd en door
// meerdere systemen gebruikt worden. Ook in Test en Acceptatie aanwezig, omdat
// deze onderdelen daar in de praktijk regelmatig voor blokkerende problemen
// zorgen — niet alleen in Productie.
export const supplierComponents: SupplierComponent[] = [
  // IDP – Identity Provider (gedeeld door alle systemen)
  { id: 'comp-01', name: 'IDP – Identity Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-02', status: 'Healthy' },
  { id: 'comp-02', name: 'IDP – Identity Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-03', status: 'Incident' },
  { id: 'comp-03', name: 'IDP – Identity Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-04', status: 'Healthy' },
  { id: 'comp-04', name: 'IDP – Identity Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-06', status: 'Healthy' },
  { id: 'comp-05', name: 'IDP – Identity Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-07', status: 'Healthy' },
  { id: 'comp-06', name: 'IDP – Identity Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-08', status: 'Healthy' },
  { id: 'comp-07', name: 'IDP – Identity Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-10', status: 'Degraded' },
  { id: 'comp-08', name: 'IDP – Identity Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-11', status: 'Healthy' },
  { id: 'comp-09', name: 'IDP – Identity Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-12', status: 'Healthy' },
  { id: 'comp-10', name: 'IDP – Identity Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-14', status: 'Healthy' },
  { id: 'comp-11', name: 'IDP – Identity Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-15', status: 'Healthy' },
  { id: 'comp-12', name: 'IDP – Identity Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-16', status: 'Incident' },

  // GBO – Generieke Back Office (web + klantenservice)
  { id: 'comp-13', name: 'GBO – Generieke Back Office', supplierName: 'Solvex Partners', environmentId: 'env-10', status: 'Healthy' },
  { id: 'comp-14', name: 'GBO – Generieke Back Office', supplierName: 'Solvex Partners', environmentId: 'env-11', status: 'Healthy' },
  { id: 'comp-15', name: 'GBO – Generieke Back Office', supplierName: 'Solvex Partners', environmentId: 'env-12', status: 'Healthy' },
  { id: 'comp-16', name: 'GBO – Generieke Back Office', supplierName: 'Solvex Partners', environmentId: 'env-14', status: 'Maintenance' },
  { id: 'comp-17', name: 'GBO – Generieke Back Office', supplierName: 'Solvex Partners', environmentId: 'env-15', status: 'Healthy' },
  { id: 'comp-18', name: 'GBO – Generieke Back Office', supplierName: 'Solvex Partners', environmentId: 'env-16', status: 'Healthy' },

  // CRM – Customer Relations Management (klantenservice)
  { id: 'comp-19', name: 'CRM – Customer Relations Management', supplierName: 'Nordic Systems Group', environmentId: 'env-14', status: 'Degraded' },
  { id: 'comp-20', name: 'CRM – Customer Relations Management', supplierName: 'Nordic Systems Group', environmentId: 'env-15', status: 'Healthy' },
  { id: 'comp-21', name: 'CRM – Customer Relations Management', supplierName: 'Nordic Systems Group', environmentId: 'env-16', status: 'Maintenance' },

  // PADP – Personal Account Data Provider (de drie klant-apps)
  { id: 'comp-22', name: 'PADP – Personal Account Data Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-02', status: 'Healthy' },
  { id: 'comp-23', name: 'PADP – Personal Account Data Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-03', status: 'Healthy' },
  { id: 'comp-24', name: 'PADP – Personal Account Data Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-04', status: 'Healthy' },
  { id: 'comp-25', name: 'PADP – Personal Account Data Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-06', status: 'Degraded' },
  { id: 'comp-26', name: 'PADP – Personal Account Data Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-07', status: 'Healthy' },
  { id: 'comp-27', name: 'PADP – Personal Account Data Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-08', status: 'Healthy' },
  { id: 'comp-28', name: 'PADP – Personal Account Data Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-10', status: 'Healthy' },
  { id: 'comp-29', name: 'PADP – Personal Account Data Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-11', status: 'Incident' },
  { id: 'comp-30', name: 'PADP – Personal Account Data Provider', supplierName: 'Nordic Systems Group', environmentId: 'env-12', status: 'Healthy' },

  // VeriFace – biometrische verificatie (alleen app)
  { id: 'comp-31', name: 'VeriFace (alleen app)', supplierName: 'VeriFace', environmentId: 'env-02', status: 'Healthy' },
  { id: 'comp-32', name: 'VeriFace (alleen app)', supplierName: 'VeriFace', environmentId: 'env-03', status: 'Maintenance' },
  { id: 'comp-33', name: 'VeriFace (alleen app)', supplierName: 'VeriFace', environmentId: 'env-04', status: 'Healthy' },
  { id: 'comp-34', name: 'VeriFace (alleen app)', supplierName: 'VeriFace', environmentId: 'env-06', status: 'Healthy' },
  { id: 'comp-35', name: 'VeriFace (alleen app)', supplierName: 'VeriFace', environmentId: 'env-07', status: 'Healthy' },
  { id: 'comp-36', name: 'VeriFace (alleen app)', supplierName: 'VeriFace', environmentId: 'env-08', status: 'Healthy' },

  // SGW – Secure Gateway (de drie klant-apps)
  { id: 'comp-37', name: 'SGW – Secure Gateway', supplierName: 'Solvex Partners', environmentId: 'env-02', status: 'Healthy' },
  { id: 'comp-38', name: 'SGW – Secure Gateway', supplierName: 'Solvex Partners', environmentId: 'env-03', status: 'Healthy' },
  { id: 'comp-39', name: 'SGW – Secure Gateway', supplierName: 'Solvex Partners', environmentId: 'env-04', status: 'Healthy' },
  { id: 'comp-40', name: 'SGW – Secure Gateway', supplierName: 'Solvex Partners', environmentId: 'env-06', status: 'Healthy' },
  { id: 'comp-41', name: 'SGW – Secure Gateway', supplierName: 'Solvex Partners', environmentId: 'env-07', status: 'Healthy' },
  { id: 'comp-42', name: 'SGW – Secure Gateway', supplierName: 'Solvex Partners', environmentId: 'env-08', status: 'Healthy' },
  { id: 'comp-43', name: 'SGW – Secure Gateway', supplierName: 'Solvex Partners', environmentId: 'env-10', status: 'Degraded' },
  { id: 'comp-44', name: 'SGW – Secure Gateway', supplierName: 'Solvex Partners', environmentId: 'env-11', status: 'Healthy' },
  { id: 'comp-45', name: 'SGW – Secure Gateway', supplierName: 'Solvex Partners', environmentId: 'env-12', status: 'Degraded' },

  // IPG – Betaalplatform (de drie klant-apps)
  { id: 'comp-46', name: 'IPG – Betaalplatform', supplierName: 'Meridian Payments', environmentId: 'env-02', status: 'Degraded' },
  { id: 'comp-47', name: 'IPG – Betaalplatform', supplierName: 'Meridian Payments', environmentId: 'env-03', status: 'Healthy' },
  { id: 'comp-48', name: 'IPG – Betaalplatform', supplierName: 'Meridian Payments', environmentId: 'env-04', status: 'Healthy' },
  { id: 'comp-49', name: 'IPG – Betaalplatform', supplierName: 'Meridian Payments', environmentId: 'env-06', status: 'Healthy' },
  { id: 'comp-50', name: 'IPG – Betaalplatform', supplierName: 'Meridian Payments', environmentId: 'env-07', status: 'Incident' },
  { id: 'comp-51', name: 'IPG – Betaalplatform', supplierName: 'Meridian Payments', environmentId: 'env-08', status: 'Healthy' },
  { id: 'comp-52', name: 'IPG – Betaalplatform', supplierName: 'Meridian Payments', environmentId: 'env-10', status: 'Healthy' },
  { id: 'comp-53', name: 'IPG – Betaalplatform', supplierName: 'Meridian Payments', environmentId: 'env-11', status: 'Healthy' },
  { id: 'comp-54', name: 'IPG – Betaalplatform', supplierName: 'Meridian Payments', environmentId: 'env-12', status: 'Degraded' },

  // ServiceHub – Kennismanagement (klantenservice)
  { id: 'comp-55', name: 'ServiceHub – Kennismanagement', supplierName: 'ServiceHub', environmentId: 'env-14', status: 'Healthy' },
  { id: 'comp-56', name: 'ServiceHub – Kennismanagement', supplierName: 'ServiceHub', environmentId: 'env-15', status: 'Degraded' },
  { id: 'comp-57', name: 'ServiceHub – Kennismanagement', supplierName: 'ServiceHub', environmentId: 'env-16', status: 'Healthy' },

  // MailForge – E-mails (klantenservice)
  { id: 'comp-58', name: 'MailForge – E-mails', supplierName: 'MailForge', environmentId: 'env-14', status: 'Healthy' },
  { id: 'comp-59', name: 'MailForge – E-mails', supplierName: 'MailForge', environmentId: 'env-15', status: 'Healthy' },
  { id: 'comp-60', name: 'MailForge – E-mails', supplierName: 'MailForge', environmentId: 'env-16', status: 'Healthy' },
]
