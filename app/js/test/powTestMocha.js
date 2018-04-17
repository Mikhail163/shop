describe('Возведение в степень', function () {
    it('Проверка 2^3 == 8', function () {
        assert.equal(pow(2, 3), 8);
    });

    it('Проверка 3^3 == 27', function () {
        assert.equal(pow(3, 3), 27);
    });

    it('Проверка 2^5 == 32', function () {
        assert.equal(pow(2, 5), 32);
    });
});

describe('Проверка на нестандартные ситуации', function () {
    it('Проверка на отрицательные значения', function () {

        assert(pow(-2, 5) === null);
        assert(pow(2, -5) === null);
        assert(pow(-2, -5) === null);
    });

    it('Проверка на дробные значения', function () {
        assert(pow(2.2, 5) === null);
        assert(pow(2, 5.2) === null);
        assert(pow(2.2, 5.2) === null);
    });
});