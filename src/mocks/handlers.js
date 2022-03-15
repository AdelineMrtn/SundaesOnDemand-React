import { rest } from 'msw';
export const handlers = [
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
        return res(
            ctx.json([
                { name: 'Chocolate', imagePath:'/images/chcolate.png'},
                { name: 'Vanilla', imagePath:'/images/chcolate.png'},
            ])
        );
    }),
];