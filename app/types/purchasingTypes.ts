export interface SchedulePurLine {
  _id: string;
  cc_id: string;
  line_no: number;
  qty: number;
  um?: string;
  product_id?: string;
  reference: string;
  reference_price?: number;
  currency?: string;
  desired_date?: string | Date;
  project_id?: string;
  vendor_list: string[];
  alreadyQuotedVendors?: string[];
}

export interface Vendor {
  vendor_id: string;
  name: string;
}

export interface QuoteRequest {
  qr_id: string;
  vendor_id: string;
  date: string;
  reference: string;
}

export interface QuoteRequestLine {
  _id: string;
  qr_id: string;
  line_no: number;
  qty: number;
  um: string;
  product_id: string;
  reference: string;
  reference_price: number;
  unit_price?: number; 
  currency: string;
  desired_date: string;
  status: string;
}
