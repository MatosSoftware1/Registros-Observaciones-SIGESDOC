/* ==========================================================
   SIGESDOC · Registro de observaciones (lógica)
   ========================================================== */
(function () {
  "use strict";

  // ---------- Datos de demostración ----------
  const USUARIO_SESION = "Ángel Matos";

  const EXPEDIENTES = [
    { codigo: "EXP-2026-0178", nombre: "Acta de consejo académico" },
    { codigo: "EXP-2026-0161", nombre: "Contrato de servicios docentes" },
    { codigo: "EXP-2026-0155", nombre: "Expediente académico – Admisiones" },
    { codigo: "EXP-2026-0142", nombre: "Solicitud de convalidación de asignaturas" },
    { codigo: "EXP-2026-0137", nombre: "Informe de auditoría interna" },
    { codigo: "EXP-2026-0129", nombre: "Nómina de personal administrativo" }
  ];

  const ESTADOS = {
    pendiente: "Pendiente",
    revision: "En revisión",
    resuelta: "Resuelta"
  };

  let observaciones = [
    {
      codigo: "EXP-2026-0142",
      descripcion: "Falta la firma del coordinador académico en el formulario de convalidación.",
      estado: "pendiente",
      usuario: "María Rodríguez",
      fecha: "2026-09-22"
    },
    {
      codigo: "EXP-2026-0161",
      descripcion: "El anexo 2 no coincide con la versión aprobada por Recursos Humanos.",
      estado: "revision",
      usuario: "José Peña",
      fecha: "2026-09-21"
    },
    {
      codigo: "EXP-2026-0155",
      descripcion: "Se corrigió el número de matrícula en la ficha de admisión.",
      estado: "resuelta",
      usuario: "Ángel Matos",
      fecha: "2026-09-19"
    }
  ];

  // ---------- Referencias al DOM ----------
  const $ = (id) => document.getElementById(id);
  const form = $("obsForm");
  const selExpediente = $("expediente");
  const txtDescripcion = $("descripcion");
  const counter = $("counter");
  const alertBox = $("formAlert");
  const errExp = $("errExpediente");
  const errDesc = $("errDescripcion");
  const inpFecha = $("fecha");
  const inpUsuario = $("usuario");
  const statusBtns = document.querySelectorAll(".status-btn");
  const tbody = $("tbody");
  const tableCount = $("tableCount");
  const emptyMsg = $("empty");
  const filtroTexto = $("filtroTexto");
  const filtroEstado = $("filtroEstado");
  const toast = $("toast");

  let estadoSeleccionado = "pendiente";
  let ultimoAgregado = null;

  // ---------- Utilidades ----------
  const hoyISO = () => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };

  const formatoFecha = (iso) => {
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  const escapeHTML = (str) =>
    str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const nombreExpediente = (codigo) =>
    (EXPEDIENTES.find((e) => e.codigo === codigo) || {}).nombre || "";

  const normalizar = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  // ---------- Inicialización ----------
  function init() {
    EXPEDIENTES.forEach((e) => {
      const opt = document.createElement("option");
      opt.value = e.codigo;
      opt.textContent = `${e.codigo} · ${e.nombre}`;
      selExpediente.appendChild(opt);
    });

    inpUsuario.value = USUARIO_SESION;
    inpFecha.value = formatoFecha(hoyISO());

    render();
  }

  // ---------- Render ----------
  function renderStats() {
    const cuenta = (e) => observaciones.filter((o) => o.estado === e).length;
    $("statTotal").textContent = observaciones.length;
    $("statPendiente").textContent = cuenta("pendiente");
    $("statRevision").textContent = cuenta("revision");
    $("statResuelta").textContent = cuenta("resuelta");
  }

  function renderTabla() {
    const texto = normalizar(filtroTexto.value.trim());
    const estado = filtroEstado.value;

    const filtradas = observaciones.filter((o) => {
      if (estado && o.estado !== estado) return false;
      if (!texto) return true;
      const hay = normalizar(`${o.codigo} ${nombreExpediente(o.codigo)} ${o.descripcion} ${o.usuario}`);
      return hay.includes(texto);
    });

    tbody.innerHTML = filtradas
      .map((o) => `
        <tr class="${o === ultimoAgregado ? "new-row" : ""}">
          <td>
            <div class="exp-code">${escapeHTML(o.codigo)}</div>
            <div class="exp-name">${escapeHTML(nombreExpediente(o.codigo))}</div>
          </td>
          <td class="col-desc">${escapeHTML(o.descripcion)}</td>
          <td><span class="pill ${o.estado}"><i class="dot ${o.estado}"></i>${ESTADOS[o.estado]}</span></td>
          <td>
            <div class="reg-user">${escapeHTML(o.usuario)}</div>
            <div class="reg-date">${formatoFecha(o.fecha)}</div>
          </td>
        </tr>`)
      .join("");

    tableCount.textContent = `${filtradas.length} de ${observaciones.length} observaciones`;
    emptyMsg.hidden = filtradas.length > 0;
  }

  function render() {
    renderStats();
    renderTabla();
  }

  // ---------- Validación ----------
  function marcar(campo, errorEl, mensaje) {
    const field = campo.closest(".field");
    field.classList.toggle("invalid", !!mensaje);
    errorEl.textContent = mensaje || "";
  }

  function validar() {
    let ok = true;

    if (!selExpediente.value) {
      marcar(selExpediente, errExp, "Seleccione el expediente relacionado.");
      ok = false;
    } else marcar(selExpediente, errExp, "");

    const desc = txtDescripcion.value.trim();
    if (!desc) {
      marcar(txtDescripcion, errDesc, "La descripción es obligatoria.");
      ok = false;
    } else if (desc.length < 10) {
      marcar(txtDescripcion, errDesc, "La descripción debe tener al menos 10 caracteres.");
      ok = false;
    } else marcar(txtDescripcion, errDesc, "");

    alertBox.hidden = ok;
    return ok;
  }

  // ---------- Acciones ----------
  function seleccionarEstado(estado) {
    estadoSeleccionado = estado;
    statusBtns.forEach((b) => {
      const activo = b.dataset.estado === estado;
      b.classList.toggle("selected", activo);
      b.setAttribute("aria-checked", activo);
    });
  }

  function limpiar() {
    form.reset();
    inpUsuario.value = USUARIO_SESION;
    inpFecha.value = formatoFecha(hoyISO());
    counter.textContent = "0/1000";
    seleccionarEstado("pendiente");
    marcar(selExpediente, errExp, "");
    marcar(txtDescripcion, errDesc, "");
    alertBox.hidden = true;
  }

  let toastTimer;
  function mostrarToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
  }

  // ---------- Eventos ----------
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validar()) {
      (selExpediente.value ? txtDescripcion : selExpediente).focus();
      return;
    }

    const nueva = {
      codigo: selExpediente.value,
      descripcion: txtDescripcion.value.trim(),
      estado: estadoSeleccionado,
      usuario: USUARIO_SESION,
      fecha: hoyISO()
    };
    observaciones.unshift(nueva);
    ultimoAgregado = nueva;

    render();
    limpiar();
    mostrarToast("Observación registrada correctamente.");
  });

  $("btnLimpiar").addEventListener("click", limpiar);

  statusBtns.forEach((b) => b.addEventListener("click", () => seleccionarEstado(b.dataset.estado)));

  txtDescripcion.addEventListener("input", () => {
    counter.textContent = `${txtDescripcion.value.length}/1000`;
    if (txtDescripcion.closest(".field").classList.contains("invalid") && txtDescripcion.value.trim()) {
      marcar(txtDescripcion, errDesc, "");
    }
  });

  selExpediente.addEventListener("change", () => {
    if (selExpediente.value) marcar(selExpediente, errExp, "");
  });

  filtroTexto.addEventListener("input", () => { ultimoAgregado = null; renderTabla(); });
  filtroEstado.addEventListener("change", () => { ultimoAgregado = null; renderTabla(); });

  // Menú móvil
  const sidebar = $("sidebar");
  const backdrop = $("backdrop");
  const toggleMenu = (abrir) => {
    sidebar.classList.toggle("open", abrir);
    backdrop.classList.toggle("show", abrir);
  };
  $("menuBtn").addEventListener("click", () => toggleMenu(!sidebar.classList.contains("open")));
  backdrop.addEventListener("click", () => toggleMenu(false));

  init();
})();
