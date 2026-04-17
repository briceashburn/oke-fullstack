import os
from borneo import NoSQLHandle, NoSQLHandleConfig, Regions
from borneo.iam import SignatureProvider

_handle = None


def get_nosql_handle() -> NoSQLHandle:
    """
    Returns a singleton NoSQL handle.
    Uses Instance Principal auth when running on OKE (no credentials needed).
    Falls back to a local config file for local development.
    """
    global _handle
    if _handle is not None:
        return _handle

    region = os.getenv("OCI_REGION", "us-chicago-1")
    use_instance_principal = os.getenv("USE_INSTANCE_PRINCIPAL", "false").lower() == "true"

    if use_instance_principal:
        # Auth via OKE Instance/Resource Principal — no keys required
        provider = SignatureProvider.create_with_instance_principal()
    else:
        # Local dev: uses ~/.oci/config
        provider = SignatureProvider()

    config = NoSQLHandleConfig(region, provider)
    _handle = NoSQLHandle(config)
    return _handle


def close_nosql_handle():
    global _handle
    if _handle:
        _handle.close()
        _handle = None
