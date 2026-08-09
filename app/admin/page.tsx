"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { BarChart3, Package, Tag, Settings, Home, Plus, Pencil, Trash2, Upload } from "lucide-react";

type Category = { id: number; name: string; slug: string; icon: string; description: string };
type Product = {
  id: number; title: string; price: number; originalPrice?: number; categoryId: number; slug: string;
  mercadoPagoLink: string; pagBankLink: string; buyLink?: string; description?: string; pdfPath?: string | null;
  active: boolean; featured: boolean; pages?: number; format?: string;
};

const emptyForm = {
  title: "", price: "", categoryId: "", description: "",
  mercadoPagoLink: "", pagBankLink: "", buyLink: "", featured: false,
};

export default function AdminPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [tab, setTab] = useState<"dashboard" | "products" | "categories" | "settings">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [pdf, setPdf] = useState<File | null>(null);
  const [editing, setEditing] = useState<Product | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [authReady, setAuthReady] = useState(false);
  const [packPrice, setPackPrice] = useState("");
  const [packOriginalPrice, setPackOriginalPrice] = useState("");

  const load = async () => {
    const res = await fetch("/api/admin/products", { cache: "no-store" });
    if (res.status === 401) { router.push("/login?next=/admin"); return; }
    if (!res.ok) throw new Error("Não foi possível carregar produtos");
    const data = await res.json();
    const loadedProducts = data.products ?? [];
    setProducts(loadedProducts);
    setCategories(data.categories ?? []);
    const pack = loadedProducts.find((p: Product) => p.slug === "pack-completo-50-apostilas");
    if (pack) {
      setPackPrice(String(pack.price));
      setPackOriginalPrice(pack.originalPrice != null ? String(pack.originalPrice) : "");
    }
  };

  useEffect(() => {
    let active = true;
    const waitForAuth = async () => {
      if (!useAuthStore.persist.hasHydrated()) {
        await new Promise<void>((resolve) => {
          const unsub = useAuthStore.persist.onFinishHydration(() => { unsub(); resolve(); });
          useAuthStore.persist.rehydrate();
        });
      }
      if (!active) return;
      setAuthReady(true);
      const current = useAuthStore.getState().user;
      if (!current || current.role !== "admin") {
        router.replace("/login?next=/admin");
        return;
      }
      load().catch((e) => setMessage(e.message));
    };
    waitForAuth();
    return () => { active = false; };
  }, [router]);

  const categoryMap = useMemo(() => new Map(categories.map((c) => [c.id, c])), [categories]);

  if (!authReady || !user || user.role !== "admin") {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Verificando permissões...</div>;
  }

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyForm, categoryId: categories[0] ? String(categories[0].id) : "" });
    setPdf(null);
    setMessage("");
  };

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      if (editing) {
        const res = await fetch(`/api/admin/products/${editing.id}`, {
          method: "PUT", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title, price: Number(form.price), categoryId: Number(form.categoryId),
            mercadoPagoLink: form.mercadoPagoLink, pagBankLink: form.pagBankLink, buyLink: form.buyLink,
            featured: form.featured,
            description: form.description,
          }),
        });
        const data = await res.json();
        if (res.status === 401) { router.push("/login?next=/admin"); return; }
        if (!res.ok) throw new Error(data.error || "Erro ao atualizar");
        setMessage("Apostila atualizada.");
      } else {
        const fd = new FormData();
        fd.append("title", form.title);
        fd.append("price", form.price);
        fd.append("categoryId", form.categoryId);
        fd.append("description", form.description);
        fd.append("mercadoPagoLink", form.mercadoPagoLink);
        fd.append("pagBankLink", form.pagBankLink);
        fd.append("buyLink", form.buyLink);
        fd.append("featured", String(form.featured));
        if (pdf) fd.append("pdf", pdf);

        const res = await fetch("/api/admin/products", { method: "POST", body: fd });
        const data = await res.json();
        if (res.status === 401) { router.push("/login?next=/admin"); return; }
        if (!res.ok) throw new Error(data.error || "Erro ao salvar");
        setMessage("Apostila salva com sucesso.");
      }
      setForm(emptyForm);
      setPdf(null);
      setEditing(null);
      await load();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Erro ao salvar");
    } finally {
      setLoading(false);
    }
  };

  const editProduct = (p: Product) => {
    setEditing(p);
    setForm({
      title: p.title, price: String(p.price), categoryId: String(p.categoryId),
      description: p.description || "", mercadoPagoLink: p.mercadoPagoLink || "",
      pagBankLink: p.pagBankLink || "", buyLink: p.buyLink || "", featured: p.featured,
    });
    setPdf(null);
    setTab("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Excluir esta apostila?")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) return setMessage(data.error || "Erro ao excluir");
    setMessage("Apostila excluída.");
    await load();
  };

  const savePackConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const pack = products.find((p) => p.slug === "pack-completo-50-apostilas");
      if (!pack) throw new Error("Pack Completo não encontrado.");
      const price = Number(packPrice.replace(",", "."));
      const originalPrice = Number(packOriginalPrice.replace(",", "."));
      if (!Number.isFinite(price) || price < 0) throw new Error("Preço do Pack inválido.");
      if (!Number.isFinite(originalPrice) || originalPrice < 0) throw new Error("Preço original do Pack inválido.");

      const res = await fetch(`/api/admin/products/${pack.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price, originalPrice }),
      });
      const data = await res.json();
      if (res.status === 401) { router.push("/login?next=/admin"); return; }
      if (!res.ok) throw new Error(data.error || "Não foi possível salvar o preço do Pack.");
      setPackPrice(String(data.product.price));
      setPackOriginalPrice(data.product.originalPrice != null ? String(data.product.originalPrice) : "");
      setMessage("Preço do Pack Completo atualizado com sucesso.");
      await load();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Erro ao salvar configuração do Pack.");
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    const res = await fetch("/api/admin/categories", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: categoryName }),
    });
    const data = await res.json();
    if (!res.ok) return setMessage(data.error || "Erro ao criar categoria");
    setCategoryName("");
    setMessage("Categoria criada.");
    await load();
  };

  const menu = [
    { id: "dashboard" as const, label: "Dashboard", icon: BarChart3 },
    { id: "products" as const, label: "Apostilas", icon: Package },
    { id: "categories" as const, label: "Categorias", icon: Tag },
    { id: "settings" as const, label: "Configurações", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <aside className="w-16 lg:w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 py-4">
        <div className="px-4 mb-6 hidden lg:block">
          <div className="font-black text-blue-700 dark:text-blue-400 text-lg">🏪 Painel Admin</div>
          <div className="text-xs text-gray-400">Olá, {user.name.split(" ")[0]}!</div>
        </div>
        <nav className="space-y-1 px-2">
          {menu.map((m) => (
            <button key={m.id} onClick={() => setTab(m.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                tab === m.id ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}>
              <m.icon size={18} /><span className="hidden lg:block">{m.label}</span>
            </button>
          ))}
        </nav>
        <div className="px-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <Link href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400">
            <Home size={18}/><span className="hidden lg:block">Ir para Loja</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-6 overflow-auto">
        {message && <div className="mb-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 text-sm">{message}</div>}

        {tab === "dashboard" && (
          <div>
            <h1 className="text-2xl font-black mb-6">📊 Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow"><div className="text-3xl font-black">{products.length}</div><div className="text-gray-500">Apostilas</div></div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow"><div className="text-3xl font-black">{categories.length}</div><div className="text-gray-500">Categorias</div></div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow"><div className="text-3xl font-black">{products.filter(p => p.pdfPath).length}</div><div className="text-gray-500">PDFs enviados</div></div>
            </div>
          </div>
        )}

        {tab === "categories" && (
          <section>
            <h1 className="text-2xl font-black mb-6">🏷️ Categorias</h1>
            <form onSubmit={addCategory} className="flex gap-2 mb-6 max-w-xl">
              <input value={categoryName} onChange={e => setCategoryName(e.target.value)} placeholder="Nome da nova categoria"
                className="flex-1 rounded-xl border px-4 py-3 dark:bg-gray-900 dark:border-gray-700" />
              <button className="rounded-xl bg-blue-600 text-white px-4 font-bold"><Plus size={18}/></button>
            </form>
            <div className="grid gap-3 max-w-2xl">
              {categories.map(c => <div key={c.id} className="bg-white dark:bg-gray-900 rounded-xl p-4 border flex items-center gap-3">
                <span className="text-2xl">{c.icon}</span><div><b>{c.name}</b><div className="text-xs text-gray-400">{products.filter(p => p.categoryId === c.id).length} apostilas</div></div>
              </div>)}
            </div>
          </section>
        )}

        {tab === "products" && (
          <section>
            <div className="flex items-center justify-between gap-3 mb-6">
              <h1 className="text-2xl font-black">📚 Apostilas ({products.length})</h1>
              <button onClick={openNew} className="bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2"><Plus size={18}/> Adicionar</button>
            </div>

            {(editing || form.title || form.categoryId || (!editing && message === "")) && (
              <form onSubmit={saveProduct} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border shadow-sm mb-6">
                <h2 className="font-black text-lg mb-4">{editing ? "Editar apostila" : "Nova apostila"}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Nome da apostila" className="rounded-xl border px-3 py-2.5 dark:bg-gray-800 dark:border-gray-700"/>
                  <input required type="number" min="0" step="0.01" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="Preço" className="rounded-xl border px-3 py-2.5 dark:bg-gray-800 dark:border-gray-700"/>
                  <div>
                    <select required value={form.categoryId} onChange={e=>setForm({...form,categoryId:e.target.value})} className="w-full rounded-xl border px-3 py-2.5 dark:bg-gray-800 dark:border-gray-700">
                      <option value="">Selecione a categoria</option>
                      <optgroup label="Categorias da loja">
                        {categories.map(c=><option key={`cat-${c.id}`} value={c.id}>{c.icon} {c.name}</option>)}
                      </optgroup>
                      <optgroup label="Todas as apostilas da loja">
                        {products.map(p=>{
                          const cat = categoryMap.get(p.categoryId);
                          return <option key={`product-${p.id}`} value={p.categoryId}>📘 {p.title}{cat ? ` — ${cat.name}` : ""}</option>;
                        })}
                      </optgroup>
                    </select>
                    <p className="text-[11px] text-gray-500 mt-1">A lista abaixo mostra todas as apostilas já cadastradas na loja. Ao escolher uma delas, a categoria correspondente é selecionada automaticamente.</p>
                  </div>
                  <label className="rounded-xl border border-dashed px-3 py-2.5 cursor-pointer dark:border-gray-700">
                    <span className="text-sm font-semibold flex items-center gap-2"><Upload size={16}/> {pdf ? pdf.name : "Selecionar PDF"}</span>
                    <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={e=>setPdf(e.target.files?.[0] ?? null)}/>
                  </label>
                  <input value={form.mercadoPagoLink} onChange={e=>setForm({...form,mercadoPagoLink:e.target.value})} type="url" placeholder="https://mpago.la/... (link real)" className="rounded-xl border px-3 py-2.5 dark:bg-gray-800 dark:border-gray-700"/>
                  <input value={form.pagBankLink} onChange={e=>setForm({...form,pagBankLink:e.target.value})} type="url" placeholder="https://pag.ae/... (link real)" className="rounded-xl border px-3 py-2.5 dark:bg-gray-800 dark:border-gray-700"/>
                  <input value={form.buyLink} onChange={e=>setForm({...form,buyLink:e.target.value})} type="url" placeholder="Link antigo/único de pagamento (opcional)" className="rounded-xl border px-3 py-2.5 dark:bg-gray-800 dark:border-gray-700"/>
                  <p className="md:col-span-2 text-xs text-gray-500">Cole aqui o link de pagamento criado no Mercado Pago ou PagBank. O sistema não cria a cobrança sozinho; ele abre o checkout real informado.</p>
                  <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Descrição" className="md:col-span-2 rounded-xl border px-3 py-2.5 min-h-24 dark:bg-gray-800 dark:border-gray-700"/>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})}/> Destaque</label>
                </div>
                <div className="flex gap-2 mt-5">
                  <button disabled={loading || !form.categoryId} className="bg-blue-600 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl font-bold">{loading ? "Salvando..." : "Salvar apostila"}</button>
                  <button type="button" onClick={()=>{setEditing(null);setForm(emptyForm);setPdf(null)}} className="border px-5 py-2.5 rounded-xl">Cancelar</button>
                </div>
              </form>
            )}

            <div className="bg-white dark:bg-gray-900 rounded-2xl border overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="text-left px-4 py-3">Apostila</th><th className="text-left px-4 py-3">Categoria</th><th className="text-left px-4 py-3">Preço</th><th className="text-left px-4 py-3">Pagamento</th><th className="px-4 py-3">Ações</th>
                </tr></thead>
                <tbody>
                  {products.map(p=><tr key={p.id} className="border-t dark:border-gray-800">
                    <td className="px-4 py-3"><b>{p.title}</b><div className="text-xs text-gray-400">{p.pdfPath ? "📄 PDF" : "Sem PDF"}</div></td>
                    <td className="px-4 py-3">{categoryMap.get(p.categoryId)?.name ?? "—"}</td>
                    <td className="px-4 py-3 font-bold">R$ {Number(p.price).toFixed(2).replace(".", ",")}</td>
                    <td className="px-4 py-3 text-xs">{p.mercadoPagoLink ? "Mercado Pago ✓" : "MP —"}<br/>{p.pagBankLink ? "PagBank ✓" : "PagBank —"}</td>
                    <td className="px-4 py-3 flex gap-2 justify-center">
                      <button onClick={()=>editProduct(p)} className="p-2 rounded-lg bg-blue-50 text-blue-700"><Pencil size={16}/></button>
                      <button onClick={()=>deleteProduct(p.id)} className="p-2 rounded-lg bg-red-50 text-red-700"><Trash2 size={16}/></button>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "settings" && (
          <section>
            <h1 className="text-2xl font-black mb-6">⚙️ Configurações</h1>
            <div className="grid gap-6 max-w-2xl">
              <form onSubmit={savePackConfig} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border">
                <h2 className="text-lg font-black mb-1">📦 Pack Completo – 50 Apostilas</h2>
                <p className="text-sm text-gray-500 mb-5">Altere o preço aqui. O novo valor será usado automaticamente na página inicial, página do produto, carrinho e checkout.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="text-sm font-semibold">Preço de venda
                    <input required type="number" min="0" step="0.01" value={packPrice} onChange={e => setPackPrice(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2.5 dark:bg-gray-800 dark:border-gray-700" />
                  </label>
                  <label className="text-sm font-semibold">Preço original
                    <input required type="number" min="0" step="0.01" value={packOriginalPrice} onChange={e => setPackOriginalPrice(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2.5 dark:bg-gray-800 dark:border-gray-700" />
                  </label>
                </div>
                <button disabled={loading} className="mt-5 rounded-xl bg-blue-600 text-white px-5 py-3 font-bold disabled:opacity-50">
                  {loading ? "Salvando..." : "Salvar preço do Pack"}
                </button>
              </form>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border">
                <p className="text-sm text-gray-500 mb-2">Contato da loja</p>
                <div className="font-semibold">WhatsApp: (11) 98852-0458</div>
                <div className="font-semibold">E-mail: souzapereira010181@gmail.com</div>
                <p className="text-xs text-gray-400 mt-4">Os links de pagamento são configurados individualmente em cada apostila.</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
