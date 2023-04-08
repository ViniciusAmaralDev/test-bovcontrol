import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Address, Farm } from "@/src/context/FarmContext";
import {
  Background,
  Container,
  Title,
  Form,
  Input,
  Label,
  Button,
  ErrorText,
  Header,
  CloseButton,
  CloseIcon,
} from "./styles";

const schema = z.object({
  name: z.string().nonempty("Campo obrigatório"),
  owner: z.string().nonempty("Campo obrigatório"),
  address: z.object({
    street: z.string(),
    neighborhood: z.string(),
    state: z.string(),
    city: z.string(),
    country: z.string(),
  }),
});

export type FarmData = z.infer<typeof schema>;

type KeysOfSchema =
  | "name"
  | "owner"
  | "street"
  | "neighborhood"
  | "state"
  | "city"
  | "country";

type KeysOfAddressSchema =
  | "address.street"
  | "address.neighborhood"
  | "address.state"
  | "address.city"
  | "address.country";

type InputProps = {
  label: string;
  name: KeysOfSchema;
  defaultValue: string;
  errorMessage?: string;
  registerName: KeysOfSchema | KeysOfAddressSchema;
};

type ModalProps = {
  farm?: Farm;
  address?: Address;
  isVisible: boolean;
  onClose: () => void;
  handleFarm: (farm: FarmData) => void;
};

export default function FarmModal({
  farm,
  address,
  isVisible,
  onClose,
  handleFarm,
}: ModalProps) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FarmData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    setValue("name", farm?.name ?? "");
    setValue("owner", farm?.owner ?? "");

    setValue("address.city", farm?.address.city ?? address?.city ?? "");
    setValue("address.state", farm?.address.state ?? address?.state ?? "");
    setValue("address.street", farm?.address.street ?? address?.street ?? "");
    setValue(
      "address.country",
      farm?.address.country ?? address?.country ?? ""
    );
    setValue(
      "address.neighborhood",
      farm?.address.neighborhood ?? address?.neighborhood ?? ""
    );
  }, [farm, address]);

  const inputs: InputProps[] = [
    {
      name: "name",
      registerName: "name",
      label: "Nome da fazenda",
      defaultValue: farm?.name ?? "",
      errorMessage: errors?.name?.message,
    },
    {
      name: "owner",
      registerName: "owner",
      label: "Nome do proprietário",
      defaultValue: farm?.owner ?? "",
      errorMessage: errors?.owner?.message,
    },
    {
      label: "Rua",
      name: "street",
      registerName: "address.street",
      errorMessage: errors?.address?.street?.message,
      defaultValue: farm?.address?.street ?? address?.street ?? "",
    },
    {
      label: "Bairro",
      name: "neighborhood",
      registerName: "address.neighborhood",
      errorMessage: errors?.address?.neighborhood?.message,
      defaultValue: farm?.address?.neighborhood ?? address?.neighborhood ?? "",
    },
    {
      label: "Cidade",
      name: "city",
      registerName: "address.city",
      errorMessage: errors?.address?.city?.message,
      defaultValue: farm?.address?.city ?? address?.city ?? "",
    },
    {
      label: "Estado",
      name: "state",
      registerName: "address.state",
      errorMessage: errors?.address?.state?.message,
      defaultValue: farm?.address?.state ?? address?.state ?? "",
    },
    {
      label: "País",
      name: "country",
      registerName: "address.country",
      errorMessage: errors?.address?.country?.message,
      defaultValue: farm?.address?.country ?? address?.country ?? "",
    },
  ];

  if (isVisible) {
    return (
      <Background>
        <Container>
          <Header>
            <Title>
              {farm ? "Detalhes da fazenda" : "Cadastrar nova fazenda"}
            </Title>

            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          </Header>

          <Form onSubmit={handleSubmit(handleFarm)}>
            {inputs.map(({ label, name, registerName, defaultValue }) => (
              <>
                <Label htmlFor={name}>{label}</Label>
                <Input
                  type="text"
                  defaultValue={defaultValue}
                  {...register(registerName as any)}
                />
                {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
              </>
            ))}

            <Button type="onSubmit">{farm ? "EDITAR" : "SALVAR"}</Button>
          </Form>
        </Container>
      </Background>
    );
  } else return null;
}
