const { loadGas } = require('./helpers/gasHarness');

function novoController(service) {
  const gas = loadGas([
    'src/shared/Envelope.js',
    'src/controller/GestaoDeParceirasController.js',
  ]);
  return new gas.GestaoDeParceirasController(service);
}

describe('GestaoDeParceirasController', () => {
  test('ativar: sucesso devolve envelope {success, data}', () => {
    const service = { ativar: (dados) => ({ parceiraId: dados.parceiraId, estado: 'Ativa' }) };
    const controller = novoController(service);

    const resposta = controller.ativar({ parceiraId: 'Maria' });

    expect(resposta).toEqual({
      success: true,
      data: { parceiraId: 'Maria', estado: 'Ativa' },
    });
  });

  test('inativar: falha do service converte em envelope {success:false, error}', () => {
    const service = {
      inativar: () => {
        throw new Error("GP-02: transição de estado inválida (§9/§17) — Parceira 'Maria' já está Inativa.");
      },
    };
    const controller = novoController(service);

    const resposta = controller.inativar({ parceiraId: 'Maria' });

    expect(resposta.success).toBe(false);
    expect(resposta.error.mensagem).toMatch(/GP-02/);
  });

  test('editarCondicaoComercial: encaminha os dados recebidos ao service', () => {
    const recebidos = [];
    const service = {
      editarCondicaoComercial: (dados) => {
        recebidos.push(dados);
        return { parceiraId: dados.parceiraId, valorMensal: dados.valorMensal };
      },
    };
    const controller = novoController(service);

    controller.editarCondicaoComercial({ parceiraId: 'Maria', valorMensal: '4000' });

    expect(recebidos).toEqual([{ parceiraId: 'Maria', valorMensal: '4000' }]);
  });
});
