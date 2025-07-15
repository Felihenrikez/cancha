export class UserRol {
    private static readonly ROLES = [ 'owner', 'player', 'admin'];

    constructor(private readonly value: string) {
        if (!UserRol.ROLES.includes(value)) {
            throw new Error(`Invalid role. Allowed roles: ${UserRol.ROLES.join(', ')}`);
        }
    }

    getValue(): string {
        return this.value;
    }
}
