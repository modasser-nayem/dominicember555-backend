import admin from "firebase-admin";

const serviceAccount = {
  type: "service_account",
  project_id: "dominicember-39b91",
  private_key_id: "b6ec4047dad6d998f572ced066cbdd150692fa7c",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDGwkWN+Mckbj+G\nIiM3eNO5paETwy55pGMWfxCAhCEx3lZ2IiPCV0oopB1ZN+ogbVjDAoGAhjNjWBXy\ngPlK3x45aQSjCfaf5U50F+Ul7YCdXSUBZ1NW7yx2pt/MbSFAPgmOT1LnXEPPvVon\n6pjI6y8Ty8cgJWG5+FUH5h+LeLiFW4jytTaUZqaDLrj+/LQv0bSWxLAjpCX37h33\n0Mbrt7J1jM+iZ/Odw6gnSIrmDGiswqmx2XGNXR6VScFknUmmVYWuZh0OgoTA5g7Z\n88V0LmPyjgphgPadADutj8XbNcQuL+Xbybyd5YO4vN5OpaptQEo3YhoqMI9vQ2Hh\nEY5Nru83AgMBAAECggEAHHHDCH1Y6pLIjoamKZMmIcRdV/mv1gK7l4WZs/q00XEz\nSHa8TVy2pThPZuxEml1rvYTHScBq7EW35luk0Z06sxafbkHHxLxJTP36ckIaDOs+\nl4PU/nT+FQDuuE/J2WrHbVFW2PtwTPOZSmsdcGuP8jJQjf4rjTTH3niFfS1KovLl\nBJ4bX+mtw5NuNwFXKjoBcKupsPDSADjGj9Dpy6RiYqP4Kp2hAmDEQaydwvmJjVkv\nimJ7nKiGpnBFOM1/ytetBDbxgRrxYPfOLMil6Iu7Mv/+Xe58/76+2b0+63vCrW8b\n54sAhSx5c6/LTLYimUvKsxJw/lN4curJT085ph0owQKBgQDlfeWgitFb/3BI+mJW\nMNdFe9Yl6LZ5F59gk6lZw/8P/1M6vy7UcN6EDPfVKGjRNA0NgdBmJucy2ys+QYvt\nDMSGs8nOTcII+JAwOr46ZZL+Ym6+iB3jmucLdzo5BWx1CwumzPGYewpXbLDzpkYf\nnojjYgnircGhcGys2ils7ZNilwKBgQDdt5kv9Bm8PvuAkvxn/3AHsXYFxzz4C6h9\n4wkcupdAhs+EtoT8IN01SWAXqMALx1qAmqYnnpNPIu8qJzlqIP3TOl9yiQ7OmRwp\n/qMrHBnAmWW1Gc6lVJdGasrmlqllmIQY4bpqR5Funpt2JhULrsxBVW+wTNhuWnYv\njTz94fSMYQKBgQDDhYvKR/svQmZMBucZP+toy6UcDzTH3pRvF99FF3OMEaC7gH9J\niBBMuS+9b/w9oPct9tey8Jox/gDNvdKVWDdn/G2HU0BpnDxcmu/PmRKvoPVxZ07v\nx93pKt90DWbmIU8AAcQkgU/CRFxOee9sqQk/kRuTAS7jeIFek1CP+amEaQKBgDhR\ndZjnsU3O1cWwEGs+SC+8FRWcqVD8bR0k+WCRyO+8DqRQVHFSy73IWJ9J3xZe2g9G\nuSPhNNvqLMQRWJUrsi3gavRF+jviSnQkWUAPED+K93nMB2CZnx9k6wstg/PpjMxh\nMh/i8/8cTLLzM29XREzoLcmji2pkkha8Ep0OszahAoGBALGMtOgOWrQlJB5ypoFY\nFainOJscf2cMdKPcPwBYDK0rC0EAdiluN1SumGfUx1YKwOE9pefDvLCGorWZs+IT\nZe0fkCo6NhafeROKWQoEpqZmaA3NdiuB3Y0CgNgIPKf4BMypGdFan7brkXtDqMWz\n8cbXTXwMIPmoRBsuYcrSoQMT\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-fbsvc@dominicember-39b91.iam.gserviceaccount.com",
  client_id: "102375236779899413669",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40dominicember-39b91.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const fcm = admin.messaging();
