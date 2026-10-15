CREATE TABLE public.medibridge_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  country text NOT NULL,
  phone text NOT NULL,
  treatment text NOT NULL,
  message text NOT NULL DEFAULT '',
  consent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.medibridge_enquiries TO anon;
GRANT INSERT ON public.medibridge_enquiries TO authenticated;
GRANT ALL ON public.medibridge_enquiries TO service_role;
ALTER TABLE public.medibridge_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can submit enquiries" ON public.medibridge_enquiries FOR INSERT TO anon WITH CHECK (consent = true);
CREATE POLICY "Signed-in visitors can submit enquiries" ON public.medibridge_enquiries FOR INSERT TO authenticated WITH CHECK (consent = true);
