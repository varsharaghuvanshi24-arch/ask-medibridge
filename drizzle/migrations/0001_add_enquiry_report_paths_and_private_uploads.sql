ALTER TABLE public.medibridge_enquiries ADD COLUMN report_paths text[];

CREATE POLICY "Visitors can upload private medical reports" ON storage.objects FOR INSERT TO anon WITH CHECK (
  bucket_id = 'medical-reports'
  AND name ~ '^[0-9a-f-]{36}/[0-9a-f-]{36}_[A-Za-z0-9._-]{1,120}$'
);

CREATE POLICY "Signed-in visitors can upload private medical reports" ON storage.objects FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'medical-reports'
  AND name ~ '^[0-9a-f-]{36}/[0-9a-f-]{36}_[A-Za-z0-9._-]{1,120}$'
);