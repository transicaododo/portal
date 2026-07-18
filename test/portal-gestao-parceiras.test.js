const { loadGas } = require('./helpers/gasHarness');

// Smoke test do Entrypoint "Portal" para a Gestão de Parceiras (SPEC-002
// UC-002.01/02): prova que as funções expostas a google.script.run
// (ativarParceira/inativarParceira/editarCondicaoComercialDaParceira)
// compõem a pilha real — Controller -> Service -> ACL — sobre uma
// planilha real obtida de SpreadsheetApp/PropertiesService (aqui, fakes).
// Mesmo molde de test/portal-cadastro.test.js. Não reimplementa regra de
// negócio; valida apenas o wiring do entrypoint.
function fakeBaseDeDados() {
  const cabecalho = ['INFLU_KEY', 'STATUS', 'VALOR_TOTAL', 'PRAZO_USO_IMAGEM'];
  const rows = [cabecalho.slice(), ['Maria', 'OFF', 3500, '12 meses']];
  return {
    get _rows() {
      return rows;
    },
    getDataRange: () => ({ getValues: () => rows.map((r) => r.slice()) }),
    appendRow: (arr) => rows.push(arr.slice()),
    getRange: (linha, coluna) => ({
      setValue: (v) => {
        rows[linha - 1][coluna - 1] = v;
      },
    }),
  };
}

function montarPortal(sheet, propriedade) {
  return loadGas(
    [
      'src/shared/Envelope.js',
      'src/shared/Config.js',
      'src/domain/Parceira.js',
      'src/acl/ParceiraACL.js',
      'src/service/GestaoDeParceirasService.js',
      'src/controller/GestaoDeParceirasController.js',
      'src/entrypoint/Portal.js',
    ],
    {
      PropertiesService: {
        getScriptProperties: () => ({ getProperty: () => propriedade }),
      },
      SpreadsheetApp: {
        openById: () => ({
          getSheetByName: (nome) => (nome === 'BASE DE DADOS' ? sheet : null),
        }),
      },
    }
  );
}

describe('Entrypoint · Portal — Gestão de Parceiras (smoke)', () => {
  test('ativarParceira ativa o vínculo e devolve envelope de sucesso', () => {
    const sheet = fakeBaseDeDados();
    const gas = montarPortal(sheet, 'fake-spreadsheet-id');

    const resposta = gas.ativarParceira({ parceiraId: 'Maria' });

    expect(resposta).toEqual({ success: true, data: { parceiraId: 'Maria', estado: 'Ativa' } });
    expect(sheet._rows[1][1]).toBe('ON');
  });

  test('editarCondicaoComercialDaParceira grava só o campo informado, preservando o resto', () => {
    const sheet = fakeBaseDeDados();
    const gas = montarPortal(sheet, 'fake-spreadsheet-id');

    const resposta = gas.editarCondicaoComercialDaParceira({
      parceiraId: 'Maria',
      valorMensal: '4000',
    });

    expect(resposta.success).toBe(true);
    expect(sheet._rows[1]).toEqual(['Maria', 'OFF', '4000', '12 meses']);
  });

  test('config ausente vira envelope de falha (nunca vaza exceção ao cliente)', () => {
    const gas = montarPortal(fakeBaseDeDados(), ''); // SPREADSHEET_ID não provisionado

    const resposta = gas.ativarParceira({ parceiraId: 'Maria' });

    expect(resposta.success).toBe(false);
    expect(resposta.error.mensagem).toMatch(/config ausente/i);
  });
});
