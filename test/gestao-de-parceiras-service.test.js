const { loadGas } = require('./helpers/gasHarness');

// Fake ACL: mesmo padrão de test/perfil-portal-service.test.js — a fatia de
// coluna física/BASE DE DADOS já é responsabilidade da ParceiraACL real
// (test/parceira-acl.test.js); aqui o foco é a orquestração do Service.
function fakeParceiraACL(estadosIniciais, condicoesIniciais) {
  const estados = Object.assign({}, estadosIniciais);
  const condicoes = Object.assign({}, condicoesIniciais);
  return {
    estados,
    condicoes,
    obterEstado(parceiraId) {
      return Object.prototype.hasOwnProperty.call(estados, parceiraId) ? estados[parceiraId] : null;
    },
    atualizarEstado(parceiraId, estadoCanonico) {
      estados[parceiraId] = estadoCanonico;
    },
    obterCondicaoComercial(parceiraId) {
      return Object.prototype.hasOwnProperty.call(condicoes, parceiraId) ? condicoes[parceiraId] : null;
    },
    atualizarCondicaoComercial(parceiraId, campos) {
      condicoes[parceiraId] = Object.assign({}, condicoes[parceiraId], campos);
    },
  };
}

function novoService(acl) {
  const gas = loadGas([
    'src/domain/Parceira.js',
    'src/service/GestaoDeParceirasService.js',
  ]);
  return new gas.GestaoDeParceirasService(acl);
}

describe('GestaoDeParceirasService — UC-002.01 · Ativar/Inativar vínculo', () => {
  test('ativar() promove Inativa → Ativa e persiste via ACL', () => {
    const acl = fakeParceiraACL({ Maria: 'Inativa' });
    const service = novoService(acl);

    const resultado = service.ativar({ parceiraId: 'Maria' });

    expect(resultado).toEqual({ parceiraId: 'Maria', estado: 'Ativa' });
    expect(acl.estados.Maria).toBe('Ativa');
  });

  // RN-11/INV-02: inativar nunca exclui o registro — a ACL fake só troca o
  // estado no mapa (equivalente a "trocar a célula STATUS"); a Parceira
  // continua presente e consultável depois.
  test('inativar() retorna Ativa → Inativa preservando o registro (RN-11)', () => {
    const acl = fakeParceiraACL({ Maria: 'Ativa' });
    const service = novoService(acl);

    const resultado = service.inativar({ parceiraId: 'Maria' });

    expect(resultado).toEqual({ parceiraId: 'Maria', estado: 'Inativa' });
    expect(acl.obterEstado('Maria')).toBe('Inativa'); // registro preservado, só o estado mudou
  });

  test('GP-01: Parceira inexistente falha barulhento em ativar() e inativar()', () => {
    const service = novoService(fakeParceiraACL({}));

    expect(() => service.ativar({ parceiraId: 'Ana' })).toThrow(/GP-01/);
    expect(() => service.inativar({ parceiraId: 'Ana' })).toThrow(/GP-01/);
  });

  test('GP-02: transição de estado inválida — ativar quem já está Ativa', () => {
    const service = novoService(fakeParceiraACL({ Maria: 'Ativa' }));

    expect(() => service.ativar({ parceiraId: 'Maria' })).toThrow(/GP-02/);
  });

  test('GP-02: transição de estado inválida — inativar quem já está Inativa', () => {
    const service = novoService(fakeParceiraACL({ Maria: 'Inativa' }));

    expect(() => service.inativar({ parceiraId: 'Maria' })).toThrow(/GP-02/);
  });
});

describe('GestaoDeParceirasService — UC-002.02 · Editar Condição Comercial', () => {
  test('grava só os campos informados e devolve a condição resultante (atual + editados)', () => {
    const acl = fakeParceiraACL(
      { Maria: 'Ativa' },
      { Maria: { valorMensal: '3500', reels: '2 reels', prazoUsoImagem: '12 meses' } }
    );
    const service = novoService(acl);

    const resultado = service.editarCondicaoComercial({
      parceiraId: 'Maria',
      valorMensal: '4000',
    });

    expect(resultado).toEqual({
      parceiraId: 'Maria',
      valorMensal: '4000',
      reels: '2 reels',
      prazoUsoImagem: '12 meses',
    });
    expect(acl.condicoes.Maria.valorMensal).toBe('4000');
  });

  test('GP-01: Parceira inexistente falha barulhento', () => {
    const service = novoService(fakeParceiraACL({}, {}));

    expect(() => service.editarCondicaoComercial({ parceiraId: 'Ana', valorMensal: '1' })).toThrow(
      /GP-01/
    );
  });
});
