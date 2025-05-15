
function closeOnOutsideClick(popupId) {
  const popup = document.getElementById(popupId);

  document.addEventListener('click', (event) => {
    const isClickInside = popup.contains(event.target);
    if (!isClickInside && popup.style.display === 'block') {
      popup.style.display = 'none';
    }
  });
}

const menuBtn = document.querySelector('.menu');
const cerrarMenuBtn = document.getElementById('cerrar-menu');
const sideMenu = document.getElementById('side-menu');
const overlay = document.getElementById('overlay');

menuBtn.addEventListener('click', () => {
  sideMenu.classList.add('show');
  overlay.classList.add('show');
});

cerrarMenuBtn.addEventListener('click', () => {
  sideMenu.classList.remove('show');
  overlay.classList.remove('show');
});

overlay.addEventListener('click', () => {
  sideMenu.classList.remove('show');
  overlay.classList.remove('show');
});

document.querySelectorAll('.acordeon-header').forEach(header => {
  if (header.classList.contains('no-toggle')) return;

  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const isActive = header.classList.contains('active');

    document.querySelectorAll('.acordeon-header').forEach(h => {
      if (!h.classList.contains('no-toggle')) {
        h.classList.remove('active');
        h.nextElementSibling.style.display = 'none';
      }
    });

    if (!isActive) {
      header.classList.add('active');
      content.style.display = 'block';
    }
  });
});

const cardImpuestos = document.getElementById('que-es-impuesto');
const infoImpuestos = document.getElementById('info-impuestos');
const cerrarInfo = document.getElementById('cerrar-info');

cardImpuestos.addEventListener('click', (event) => {
  event.stopPropagation();
  infoImpuestos.style.display = 'block';
});

cerrarInfo.addEventListener('click', (event) => {
  event.stopPropagation();
  infoImpuestos.style.display = 'none';
});

closeOnOutsideClick('info-impuestos');

const tipsCard = document.querySelectorAll('.card .card-title');
const popupTips = document.getElementById('popup-tips');
const cerrarTips = document.getElementById('cerrar-tips');

tipsCard.forEach(card => {
  if (card.textContent.includes('Tips y sugerencias')) {
    card.closest('.card').addEventListener('click', (event) => {
      event.stopPropagation();
      popupTips.style.display = 'block';
    });
  }
});

cerrarTips.addEventListener('click', (event) => {
  event.stopPropagation();
  popupTips.style.display = 'none';
});

closeOnOutsideClick('popup-tips');

const faqCard = document.querySelectorAll('.card .card-title');
const popupFaq = document.getElementById('popup-faq');
const cerrarFaq = document.getElementById('cerrar-faq');

faqCard.forEach(card => {
  if (card.textContent.includes('Preguntas frecuentes')) {
    card.closest('.card').addEventListener('click', (event) => {
      event.stopPropagation();
      popupFaq.style.display = 'block';
    });
  }
});

cerrarFaq.addEventListener('click', (event) => {
  event.stopPropagation();
  popupFaq.style.display = 'none';
});

closeOnOutsideClick('popup-faq');

document.querySelectorAll('.faq-item h3').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    header.classList.toggle('active');
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
});

document.querySelectorAll('.calc-tabs button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.calc-tabs button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.calc-tab-content').forEach(tab => tab.style.display = 'none');
    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).style.display = 'block';
  });
});

document.querySelector('.card.highlight button').addEventListener('click', (event) => {
  event.stopPropagation();
  document.getElementById('popup-calculadora').style.display = 'block';
});

document.getElementById('cerrar-calculadora').addEventListener('click', (event) => {
  event.stopPropagation();
  document.getElementById('popup-calculadora').style.display = 'none';
});

closeOnOutsideClick('popup-calculadora');

const tipoSelect = document.getElementById('tipo');
const categoriaSelect = document.getElementById('categoria');
const infoITBIS = document.getElementById('info-itbis');

document.getElementById('btn-calcular-popup').addEventListener('click', () => {
  const precio = parseFloat(document.getElementById('precio').value) || 0;
  const cantidad = parseInt(document.getElementById('cantidad').value) || 1;
  const tipo = tipoSelect.value;
  const categoria = categoriaSelect.value;

  let tasa = 0.18;

  if (tipo === 'Servicio') {
    tasa = 0.18;
  } else if (categoria === 'exento') {
    tasa = 0.00;
  } else if (categoria === 'reducido') {
    tasa = 0.16;
  }

  const subtotal = precio * cantidad;
  const itbis = subtotal * tasa;
  const total = subtotal + itbis;

  document.getElementById('subtotal').textContent = `RD$ ${subtotal.toFixed(2)}`;
  document.getElementById('itbis').textContent = `RD$ ${itbis.toFixed(2)}`;
  document.getElementById('total-itbis').textContent = `RD$ ${total.toFixed(2)}`;
  document.getElementById('total').textContent = total.toFixed(2);

  const inputITBIS = document.getElementById('tasa-itbis');
  if (inputITBIS) {
    inputITBIS.value = `${(tasa * 100).toFixed(0)}%`;
  }

  guardarHistorial('itbis', {
    nombre: document.getElementById('nombre-producto').value,
    tipo,
    categoria,
    precio,
    cantidad,
    subtotal: subtotal.toFixed(2),
    itbis: itbis.toFixed(2),
    total: total.toFixed(2),
    tasa: `${(tasa * 100).toFixed(0)}%`
  });
});

categoriaSelect.addEventListener('change', () => {
  const categoria = categoriaSelect.value;

  if (categoria === 'reducido') {
    infoITBIS.textContent = 'Esta categoría tiene una tasa reducida del 16% de ITBIS.';
  } else if (categoria === 'exento') {
    infoITBIS.textContent = 'Esta categoría tiene una exención del ITBIS.';
  } else {
    infoITBIS.textContent = 'Se aplicará la tasa general del 18% de ITBIS.';
  }
});

tipoSelect.addEventListener('change', () => {
  const tipo = tipoSelect.value;

  if (tipo === 'Servicio') {
    categoriaSelect.disabled = true;
    categoriaSelect.value = '';
    infoITBIS.textContent = 'Los servicios aplican una tasa general del 18% de ITBIS.';
    document.getElementById('tasa-itbis').value = '18%';
  } else {
    categoriaSelect.disabled = false;
    infoITBIS.textContent = '';
  }
});

const campoNombre = document.getElementById('campo-nombre');

const serviciosGravados = [
  'Servicios Profesionales',
  'Servicios de Comunicación',
  'Servicios de Hospedaje y Alimentación',
  'Servicios de Publicidad',
  'Servicios de Transporte Aéreo y Marítimo',
  'Servicios de Vigilancia y Seguridad Privada',
  'Servicios de Construcción',
  'Servicios de Alquiler de Bienes Muebles',
  'Servicios de Floristería',
  'Servicios de Organización de eventos',
  'Servicios de Lavandería'
];

tipoSelect.addEventListener('change', () => {
  const tipo = tipoSelect.value;

  if (tipo === 'Servicio') {
    // Reemplaza input por select
    const select = document.createElement('select');
    select.id = 'nombre-producto';
    select.innerHTML = serviciosGravados.map(servicio => `<option>${servicio}</option>`).join('');
    campoNombre.innerHTML = '';
    campoNombre.appendChild(select);

    categoriaSelect.disabled = true;
    categoriaSelect.value = '';
    infoITBIS.textContent = 'Los servicios aplican una tasa general del 18% de ITBIS.';
    document.getElementById('tasa-itbis').value = '18%';
  } else {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Nombre';
    input.id = 'nombre-producto';
    campoNombre.innerHTML = '';
    campoNombre.appendChild(input);

    categoriaSelect.disabled = false;
    infoITBIS.textContent = '';
  }
});


document.getElementById('btn-calcular-isr').addEventListener('click', () => {
  const beneficio = parseFloat(document.getElementById('beneficio-anual').value);

  if (isNaN(beneficio) || beneficio <= 0) {
    document.getElementById('resultado-isr').textContent = 'RD$ 0.00';
    return;
  }

  const impuesto = beneficio * 0.27;
  document.getElementById('resultado-isr').textContent = `RD$ ${impuesto.toLocaleString(undefined, {
    minimumFractionDigits: 2
  })}`;
  guardarHistorial('isr', {
    beneficio,
    impuesto: impuesto.toFixed(2)
  });
});
document.getElementById('tipo-servicio-isc').addEventListener('change', () => {
  const tipo = document.getElementById('tipo-servicio-isc').value;
  const tasaInput = document.getElementById('tasa-isc');

  let tasa = 0;
  if (tipo === 'telecom') tasa = 10;
  else if (tipo === 'seguros') tasa = 16;
  else if (tipo === 'cheques') tasa = 0.15;

  tasaInput.value = tasa ? `${tasa}%` : '';

});

document.getElementById('btn-calcular-isc').addEventListener('click', () => {
  const monto = parseFloat(document.getElementById('monto-servicio-isc').value) || 0;
  const tipo = document.getElementById('tipo-servicio-isc').value;

  let tasa = 0;
  if (tipo === 'telecom') {
    tasa = 0.10;
  } else if (tipo === 'seguros') {
    tasa = 0.16;
  } else if (tipo === 'cheques') {
    tasa = 0.0015;
  }

  const isc = monto * tasa;
  const total = monto + isc;

  document.getElementById('monto-base-isc').textContent = `RD$ ${monto.toFixed(2)}`;
  document.getElementById('isc-aplicado').textContent = `RD$ ${isc.toFixed(2)}`;
  document.getElementById('total-con-isc').textContent = `RD$ ${total.toFixed(2)}`;

  guardarHistorial('isc', {
    servicio: document.getElementById('tipo-servicio-isc').selectedOptions[0].textContent,
    monto,
    tasa: (tasa * 100).toFixed(2),
    isc: isc.toFixed(2),
    total: total.toFixed(2)
  });
});

document.querySelectorAll('.calc-tabs button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.calc-tabs button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.calc-tab-content').forEach(tab => {
      tab.style.display = 'none';
    });

    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    if (tabId) {
      const tabElement = document.getElementById(tabId);
      if (tabElement) {
        tabElement.style.display = 'block';
      }
    }
  });
});

document.getElementById('btn-limpiar-itbis').addEventListener('click', () => {
  document.getElementById('nombre-producto').value = '';
  document.getElementById('tipo').value = 'Producto';
  document.getElementById('categoria').value = '';
  document.getElementById('precio').value = '';
  document.getElementById('cantidad').value = '1';
  document.getElementById('tasa-itbis').value = '18%';
  document.getElementById('subtotal').textContent = 'RD$ 0.00';
  document.getElementById('itbis').textContent = 'RD$ 0.00';
  document.getElementById('total-itbis').textContent = 'RD$ 0.00';
  document.getElementById('total').textContent = '0';
  document.getElementById('info-itbis').textContent = '';

  const campoNombre = document.getElementById('campo-nombre');
  if (!document.getElementById('nombre-producto')) {
    campoNombre.innerHTML = `<input type="text" placeholder="Nombre" id="nombre-producto" />`;
  }

  document.getElementById('categoria').disabled = false;
  agregarAlHistorial('ITBIS', `Total: RD$ ${total.toFixed(2)} (ITBIS: ${tasa * 100}%)`);
});

document.getElementById('btn-limpiar-isr').addEventListener('click', () => {
  document.getElementById('beneficio-anual').value = '';
  document.getElementById('resultado-isr').textContent = 'RD$ 0.00';
});

document.getElementById('btn-limpiar-isc').addEventListener('click', () => {
  document.getElementById('tipo-servicio-isc').value = '';
  document.getElementById('monto-servicio-isc').value = '';
  document.getElementById('tasa-isc').value = '';
  document.getElementById('monto-base-isc').textContent = 'RD$ 0.00';
  document.getElementById('isc-aplicado').textContent = 'RD$ 0.00';
  document.getElementById('total-con-isc').textContent = 'RD$ 0.00';
});


const popupHistorial = document.getElementById('popup-historial');
const listaHistorial = document.getElementById('lista-historial');
const cerrarHistorial = document.getElementById('cerrar-historial');
const limpiarHistorial = document.getElementById('limpiar-historial');

document.getElementById('abrir-historial').addEventListener('click', (event) => {
  event.stopPropagation();
  popupHistorial.style.display = 'block';
  renderHistorial();
});

cerrarHistorial.addEventListener('click', () => {
  popupHistorial.style.display = 'none';
});

limpiarHistorial.addEventListener('click', () => {
  localStorage.removeItem('historial');
  renderHistorial();
});

closeOnOutsideClick('popup-historial');

function guardarHistorial(tipo, datos) {
  const historial = JSON.parse(localStorage.getItem('historial')) || [];
  historial.unshift({ tipo, datos, fecha: new Date().toLocaleString() });
  localStorage.setItem('historial', JSON.stringify(historial));
}

function renderHistorial() {
  const historial = JSON.parse(localStorage.getItem('historial')) || [];
  listaHistorial.innerHTML = '';

  if (historial.length === 0) {
    listaHistorial.innerHTML = '<li>No hay cálculos guardados.</li>';
    return;
  }

  historial.forEach(entry => {
    const li = document.createElement('li');
    const { tipo, datos, fecha } = entry;

    if (tipo === 'itbis') {
      li.innerHTML = `<strong>ITBIS</strong> – ${fecha}<br>
        Nombre: ${datos.nombre}<br>
        Tipo: ${datos.tipo}<br>
        Categoría: ${datos.categoria}<br>
        Precio: RD$ ${datos.precio}<br>
        Cantidad: ${datos.cantidad}<br>
        Subtotal: RD$ ${datos.subtotal}<br>
        Tasa: ${datos.tasa}<br>
        ITBIS: RD$ ${datos.itbis}<br>
        Total: RD$ ${datos.total}`;
    } else if (tipo === 'isr') {
      li.innerHTML = `<strong>ISR</strong> – ${fecha}<br>
        Beneficio: RD$ ${datos.beneficio}<br>
        Impuesto (27%): RD$ ${datos.impuesto}`;
    } else if (tipo === 'isc') {
      li.innerHTML = `<strong>ISC</strong> – ${fecha}<br>
        Tipo de servicio: ${datos.servicio}<br>
        Monto: RD$ ${datos.monto}<br>
        Tasa: ${datos.tasa}%<br>
        ISC: RD$ ${datos.isc}<br>
        Total: RD$ ${datos.total}`;
    }

    listaHistorial.appendChild(li);
  });
}
